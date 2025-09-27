-- CreateTable
CREATE TABLE `character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `age` INTEGER NOT NULL,
    `player` VARCHAR(255) NOT NULL,
    `class` VARCHAR(255) NOT NULL,
    `trail` VARCHAR(255) NOT NULL,
    `afinity` VARCHAR(255) NOT NULL,
    `origin` VARCHAR(255) NOT NULL,
    `patent` VARCHAR(255) NOT NULL,
    `NEX` INTEGER NOT NULL,
    `FOR` INTEGER NOT NULL,
    `AGI` INTEGER NOT NULL,
    `INT` INTEGER NOT NULL,
    `VIG` INTEGER NOT NULL,
    `PRE` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
