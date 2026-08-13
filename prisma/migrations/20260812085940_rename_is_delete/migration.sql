/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "isDeleted",
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "isDeleted",
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isDeleted",
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "isDelete",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
