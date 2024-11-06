-- CreateTable
CREATE TABLE `Image` (
    `_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(400) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `imageId` VARCHAR(400) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Image_userId_key`(`userId`),
    UNIQUE INDEX `Image_imageId_key`(`imageId`),
    UNIQUE INDEX `Image_userId_imageId_key`(`userId`, `imageId`),
    PRIMARY KEY (`_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
