/*
  Warnings:

  - You are about to drop the column `count` on the `reactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reactions" DROP COLUMN "count";

-- AlterTable
ALTER TABLE "views" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 1;
