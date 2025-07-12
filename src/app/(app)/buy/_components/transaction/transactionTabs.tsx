import { Card, CardTitle } from "@/components/ui/card";
import TransactionTable from "./_components/transactionTable";

export default function TransactionTabs() {
  return (
    <Card className="px-4 w-full">
      <CardTitle>TransactionList</CardTitle>
      <TransactionTable />
    </Card>
  );
}
