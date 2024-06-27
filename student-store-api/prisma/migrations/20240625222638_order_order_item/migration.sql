/*
  Warnings:

  - The primary key for the `OrderItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderItem` table. All the data in the column will be lost.
  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `order_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_pkey",
DROP COLUMN "id",
DROP COLUMN "orderId",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "order_item_id" SERIAL NOT NULL,
ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("order_item_id");

-- AlterTable
CREATE SEQUENCE orders_order_id_seq;
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
DROP COLUMN "id",
ALTER COLUMN "order_id" SET DEFAULT nextval('orders_order_id_seq'),
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("order_id");
ALTER SEQUENCE orders_order_id_seq OWNED BY "Orders"."order_id";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Orders"("order_id") ON DELETE RESTRICT ON UPDATE CASCADE;
