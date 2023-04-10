import Order from "../../../domain/entity/order";
import OrderItem from "../../../domain/entity/order_item";
import OrderItemModel from "../../db/sequelize/model/order-item.model";
import OrderModel from "../../db/sequelize/model/order.model";
import { Sequelize } from "sequelize-typescript";

export default class OrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [OrderItemModel],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    await this.updateItems(entity.items, entity.id);
  }

  private async updateItems(
    items: OrderItem[],
    idOrder: string
  ): Promise<void> {
    const currentItems = await OrderItemModel.findAll({
      where: { order_id: idOrder },
    });

    for (const item of items) {
      const itemHasBeenCreated = currentItems.find((x) => x.id === item.id);

      if (!itemHasBeenCreated) {
        await this.createOrderItem(item, idOrder);
        continue;
      }
      await this.updateOrderItem(item);
    }

    for (const currentItem of currentItems) {
      const wasDeleted = !items.find((x) => x.id === currentItem.id);

      if (wasDeleted) {
        this.deleteOrderItem(currentItem.id);
      }
    }
  }

  private async createOrderItem(
    item: OrderItem,
    orderId: string
  ): Promise<void> {
    await OrderItemModel.create({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: orderId,
    });
  }

  private async updateOrderItem(item: OrderItem): Promise<void> {
    await OrderItemModel.update(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      },
      {
        where: {
          id: item.id,
        },
      }
    );
  }

  private async deleteOrderItem(id: string): Promise<void> {
    await OrderItemModel.destroy({
      where: {
        id: id,
      },
    });
  }
}
