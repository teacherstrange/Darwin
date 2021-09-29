/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('BLOG', 'ECOMMERCE', 'SITE', 'OTHER');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "description",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ProjectType" DEFAULT E'BLOG';
