"use server";
import { getHistory } from "@/lib/midtrans";

export default async function getTransactions() {
  try {
    console.log("fetching...");
    const { data } = await getHistory();
    return { data };
  } catch (error) {
    const err = error as any;
    console.log(err);
    return { error };
  }
}
