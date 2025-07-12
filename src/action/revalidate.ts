"use server";
import { revalidatePath } from "next/cache";

export default async function revalidate(form: FormData) {
  const path = form.get("path") as string;
  revalidatePath(path);
}
