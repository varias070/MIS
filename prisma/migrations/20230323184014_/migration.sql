/*
  Warnings:

  - You are about to drop the column `spec` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `spec_id` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `spec`,
    ADD COLUMN `spec_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Spec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_spec_id_fkey` FOREIGN KEY (`spec_id`) REFERENCES `Spec`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
