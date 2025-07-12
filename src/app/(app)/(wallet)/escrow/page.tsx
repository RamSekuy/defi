import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContractTabs from "./_components/contractTabs";
import EscrowTransactions from "./_components/escrowTransactions";

export default async function Page() {
  return (
    <Tabs defaultValue="contract" className="min-h-screen max-w-lg w-full">
      <div className="flex justify-center h-20 items-center">
        <TabsList className="flex w-full mx-auto justify-between gap-4 bg-transparent shadow-none border-none">
          <TabsTrigger value="contract" className="hover:bg-primary">
            Contract
          </TabsTrigger>
          <TabsTrigger value="tx" className="hover:bg-primary">
            Transaction
          </TabsTrigger>
        </TabsList>
      </div>
      <div>
        <TabsContent value="contract">
          <ContractTabs />
        </TabsContent>
        <TabsContent value="tx">
          <div></div>
          <EscrowTransactions />
        </TabsContent>
      </div>
    </Tabs>
  );
}
