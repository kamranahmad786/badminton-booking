import client from "./client.js";

export async function fetchMeta(date) {
  const res = await client.get("/meta/availability", { params: { date } });
  return res.data;
}

export async function pricePreview(payload) {
  const res = await client.post("/meta/price-preview", payload);
  return res.data;
}
