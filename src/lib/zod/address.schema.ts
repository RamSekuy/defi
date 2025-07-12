import { isAddress } from "ethers";
import z from "zod";

const addressSchema = z.string().refine((value) => isAddress(value), {
  message:
    "Provided address is invalid. Please insure you have typed correctly.",
});
export default addressSchema;
