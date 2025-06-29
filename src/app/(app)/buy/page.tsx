import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyTabs from "./_components/buy/buyTabs";
import TransactionTabs from "./_components/transaction/transactionTabs";

export default function Page() {
  return (
    <Tabs defaultValue="buy" className="min-h-screen max-w-lg w-full">
      <div className="flex justify-center h-20 items-center">
        <TabsList className="flex w-full mx-auto justify-between gap-4 bg-transparent shadow-none border-none">
          <TabsTrigger value="buy" className="hover:bg-primary">
            Buy
          </TabsTrigger>
          <TabsTrigger value="tx" className="hover:bg-primary">
            Transaction
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="px-4 mx-auto">
        <TabsContent value="buy">
          <BuyTabs />
        </TabsContent>
        <TabsContent value="tx" className="w-full">
          <TransactionTabs />
        </TabsContent>
      </div>
      <h1>NOT COMPLETE(Just Frontend)</h1>
    </Tabs>
  );
}
