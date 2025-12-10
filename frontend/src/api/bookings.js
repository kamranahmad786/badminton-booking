import client from "./client.js";

export async function createBooking(payload) {
  const res = await client.post("/bookings", payload);
  return res.data;
}

export async function getBookingsForUser(userName) {
  const res = await client.get("/bookings", { params: { userName } });
  return res.data;
}
