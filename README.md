# MIS

## Инструкция для запуска:

1. Клонировать репозиторий из гит

      ```bash
       git clone git@github.com:varias070/MIS.git
     ```
2. настроить файл .env пример можно посмотреть в .env.dev

3. Выполнить 

   ```bash
    docker-compose pull
    docker-compose build 
    docker-compose up db
    docker-compose up app
    docker-compose exec app node filler.js
   ```
4. docker-compose exec app node filler.js выполняется только при первом запуске, дальнейший запуск происходит командой
   ```bash
   docker-compose up
   ```

5. Сценарий использования

   Для удобного тестирование все запросы имеют метод POST(конечно в производственной среде это не допустимо)

   1 для получение расписание нужно отправить запрос http://127.0.0.1:3000/get_schedule с запросом необходимо передать джсон {"doctor_id": 2, "patient_id": null, "date": '3-9-2023 ', "time_from": '20-30', "is_free": true,}

   2 создать специальность http://127.0.0.1:3000/create_spec и передать джсон {"title": "Surgeon"}

   3 создать врача http://127.0.0.1:3000/create_doctor и передать джсон {"name": "Ivan", "spec_id": 1, "price": 1000}

   4 создать пациента http://127.0.0.1:3000/create_patient и передать джсон  {"phone": "+7 913 743 24 35", "name": "Jason", "email": "jason@examaple.com", "gender": "male",}

   5 создать расписание для врача http://127.0.0.1:3000/create_schedule и передать джсон {"doctor_id": 1,"date": "2018-04-04T09:00",} создается 24 приема  с 9:00 до 21:00 по 30 минут каждый

   6 получить расписание http://127.0.0.1:3000/get_schedule и передать параметры поиска {"doctor_id": 2, "patient_id": null, "date": '3-9-2023 ', "time_from": '20-30', "is_free": true,} 

   7 для записи на прием необходимо отправить запрос http://127.0.0.1:3000/make_appointment и джсон {"id": 7, "patient_id": 1, "type": 0} поле type может принимать значение 0-первичный прием и 1-вторичный прием
   
   8 для удаление пациента необходимо отправить запрос http://127.0.0.1:3000/delete_patient и джсон {id: 1} он удалит пациента и все связанные с им записи.
   
   9 для поиска пациента необходимо отправить запрос http://127.0.0.1:3000/get_patient и передать {id: 1}, при передачи {} выберутся все пациенты.

   более подробные примеры содержатся в файле req.js

6. Запуск рассылки 
   
   открыть файл ./sender/config.js и настроить transporter и
   открыть crontab на хосте
   ```bash
      crontab -e
   ```
   и записать команды для запуска скриптов
   ```bash
       */30 * * * * docker-compose run --no-deps app node ./sender/today.js
   ```
   команда запускает каждые 30 минут today.js . Он делает рассылку на прием через 2 часа.

   ```bash
      0 8 * * * docker-compose run --no-deps app node ./sender/tomorrow.js
   ```
   команда запускает каждый день в 8 часов срипт tomorrow.js . Он делает рассылку o приеме на завтра.