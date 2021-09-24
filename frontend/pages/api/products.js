// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getProducts } from "../../lib/products";

async function handler(req, res) {
  const products = await getProducts();
  res.status(200).json(products);
}

export default handler;
