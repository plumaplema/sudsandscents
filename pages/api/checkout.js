import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const {
      name,
      phoneNumber,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paymentMethod,
      productToPurchase,
      status
    } = req.body;
    const orderDoc = await Order.create({
      line_items: productToPurchase,
      name,
      email,
      phoneNumber,
      city,
      postalCode,
      streetAddress,
      country,
      paymentMethod,
      status
    });
    console.log(orderDoc);
    res.json(orderDoc);
  }
}
