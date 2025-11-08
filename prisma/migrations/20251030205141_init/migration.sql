/*
  Warnings:

  - You are about to drop the column `color` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `products` table. All the data in the column will be lost.
  - You are about to alter the column `stock` on the `products` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `userId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `color`,
    DROP COLUMN `size`,
    ADD COLUMN `img` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `stock` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Products` ADD CONSTRAINT `Products_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
