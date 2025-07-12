import { Card, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SelectTokenList, SelectTokenTrigger } from "./_components/selectToken";
import CartDetails from "./_components/cartDetails";
import MoneyInput from "./_components/moneyInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputWallet from "./_components/inputWallet";

export default function BuyTabs() {
  return (
    <Card className="w-lg bg-[#171a20] px-2 overflow-hidden h-[80dvh]">
      <CardTitle className="text-center">Buy Token</CardTitle>
      <ScrollArea className="w-full gap-4 h-full px-8">
        <div className="w-full flex flex-col items-center *:w-full gap-y-4">
          <div>
            <InputWallet />
          </div>
          <div className="flex gap-4">
            <Drawer>
              <DrawerTrigger>
                <SelectTokenTrigger />
              </DrawerTrigger>
              <MoneyInput />
              <DrawerContent className="">
                <DrawerHeader>
                  <DrawerTitle>Select Token</DrawerTitle>
                  <SelectTokenList />
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
          <CartDetails />
        </div>
      </ScrollArea>
    </Card>
  );
}
