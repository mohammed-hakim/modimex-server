import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
@Controller('orders')
export class OrderController {
  constructor(private readonly orders: OrderService) {}
  @MessagePattern('index-orders')
  index(data) {
    return this.orders.get(data);
  }
  @MessagePattern('all-orders')
  allOrders(data) {
    console.log(data);

    return this.orders.getAll(data);
  }
  @MessagePattern('show-user-order')
  show({ id, user_id }: { id: string; user_id: string }) {
    console.log(id, user_id);
    return this.orders.findByIdAndUserId(id, user_id);
  }
  @MessagePattern('destroy-order-by-id')
  destroy({ id, user_id }: { user_id: string; id: string }) {
    return this.orders.destroy({ id, user_id });
  }
  @MessagePattern('find-order-by-productId')
  findWithProdId(id) {
    return this.orders.finWithProductId(id);
  }
  @MessagePattern('create_order')
  store(data: any) {
    return this.orders.create(data);
  }
  @EventPattern('order_charged')
  markOrderStatus(data) {
    return this.orders.markOrderStatus(data);
  }
}
