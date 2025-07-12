"use client";

import getTransactions from "@/action/getTransactions";
import { DataTable } from "@/components/ui/dataTable";
import { getHistory } from "@/lib/midtrans";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TransactionTable() {
  const [data, setData] = useState(null);
  useEffect(() => {
    getTransactions().then(({ data, error }) => {
      if (error || !data) return toast.error("failed to fetch data");
      console.log(data);
    });
  }, []);
  return (
    // <DataTable data={}/>
    <></>
  );
}
