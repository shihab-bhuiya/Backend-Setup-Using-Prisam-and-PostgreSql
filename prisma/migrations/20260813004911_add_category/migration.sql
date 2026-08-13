/*
  Warnings:

  - You are about to drop the column `isDelete` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `isDelete` on the `reviews` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "categories_slug_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "isDelete",
DROP COLUMN "slug",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "isDelete",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isDelete",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "categories_name_idx" ON "categories"("name");
