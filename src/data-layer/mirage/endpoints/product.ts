import { Response, Server } from "miragejs";
import { AppSchema } from "../types";

export function routesForProducts(server: Server) {
  server.get(`/products`, (schema: AppSchema, request) => {
    const { page, size } = request.queryParams;
    const products = schema.all("product");

    const _page = page ? parseInt(page) : 0;
    const _size = size ? parseInt(size) : 20;

    return new Response(
      200,
      {},
      {
        page,
        size,
        total: products.length,
        items: products.models.slice(_page * _size, (_page + 1) * _size),
      }
    );
  });

  server.get(`/products/:id`, (schema: AppSchema, request) => {
    const { id } = request.params;
    const product = schema.find("product", id);

    return product
      ? new Response(200, {}, { data: product })
      : new Response(404, {}, { errors: ["content does not exist"] });
  });
}
