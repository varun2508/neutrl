import { Order } from "../entities/OrderEntity";
import { Arg, Args, Field, InputType, Mutation } from "type-graphql";

@InputType()
class RecordOrderOptions {
  @Field()
  shop: string;

  @Field()
  orderInfo: string;
}

export class OrderResolver {
  @Mutation(() => Boolean)
  async recordOrder(@Arg("options") options: RecordOrderOptions) {
    try {
      await Order.create({
        ...options,
      }).save();
      return true;
    } catch (error) {
      console.error("Error recording order: ", error);
      return false;
    }
  }
}
