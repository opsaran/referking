import { shopifyApi } from "@shopify/shopify-api";

export async function runGraphQLQuery(session, query, variables = {}) {
  const client = new shopifyApi.clients.Graphql({ session });
  return await client.query({ data: { query, variables } });
}
