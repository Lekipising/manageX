/*
  Warnings:

  - Added the required column `assignedId` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `request` ADD COLUMN `assignedId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `Request_assignedId_fkey` FOREIGN KEY (`assignedId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
