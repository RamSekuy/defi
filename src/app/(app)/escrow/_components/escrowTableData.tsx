"use client";
import { DataTable } from "@/components/ui/dataTable";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import config from "@/smartContract/config";

type EscrowLog = { address: string; id: string };

type Props = {
  logs: EscrowLog[];
};

export default function EscrowTableData({ logs }: Props) {
  const columns: ColumnDef<EscrowLog, any>[] = [
    {
      header: "Escrow Address",
      accessorFn: (row) => row.address,
      cell: ({ row }) => (
        <span className="font-mono">{row.original.address}</span>
      ),
    },
    {
      header: "Action",
      accessorFn: (row) => row.address,
      cell: ({ row }) => (
        <div className=" flex gap-2">
          <Link
            href={`/escrow/${row.original.address}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
          >
            Details
          </Link>
          <Link
            target="_blank"
            href={`${config.blockExplorer + "address/" + row.original.address}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
          >
            Open in blockExplorer
          </Link>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={logs} />;
}
