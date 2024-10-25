/*
  Warnings:

  - You are about to drop the column `textContent` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `textContent` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `textContent` on the `Review` table. All the data in the column will be lost.
  - Added the required column `text` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "textContent",
ADD COLUMN     "text" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "textContent",
ADD COLUMN     "header" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "textContent",
ADD COLUMN     "text" TEXT NOT NULL;
