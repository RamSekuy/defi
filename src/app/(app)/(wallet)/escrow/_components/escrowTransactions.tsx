import { escrowFactoryReadOnly } from "@/smartContract/config";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import EscrowTableData from "./escrowTableData";

export default async function EscrowTransactions() {
  const factory = escrowFactoryReadOnly();
  const filter = factory.filters.EscrowCreated();
  const logs = await factory.queryFilter(filter, 1000, 500);
  const parsed = logs
    .map((log, i) => {
      return {
        id: i.toString(),
        address: log.args[2],
      };
    })
    .filter((e) => e != null);
  return (
    <Card className="max-w-lg w-full mx-auto">
      <CardContent className="text-center">
        <CardTitle className="mb-4">
          Escrow Contract List (last 500 blocks)
        </CardTitle>
        <EscrowTableData logs={parsed} />
      </CardContent>
    </Card>
  );
}
