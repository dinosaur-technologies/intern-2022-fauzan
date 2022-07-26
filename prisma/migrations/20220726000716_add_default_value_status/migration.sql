/*
  Warnings:

  - Made the column `status` on table `Fine` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Loan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Fine" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT E'Not Paid';

-- AlterTable
ALTER TABLE "Loan" ALTER COLUMN "status" SET NOT NULL,
ALTER COLUMN "status" SET DEFAULT E'Not Returned';
