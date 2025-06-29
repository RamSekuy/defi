import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SelectTokenList, SelectTokenTrigger } from "./_components/selectToken";
import { Button } from "@/components/ui/button";
import CartDetails from "./_components/cartDetails";
import MoneyInput from "./_components/moneyInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function BuyTabs() {
  return (
    <Card className="w-full max-w-lg bg-[#171a20] px-2 overflow-hidden h-[80dvh]">
      <ScrollArea className="w-full gap-4 h-full px-8">
        <div className="w-full flex flex-col items-center *:w-full gap-y-4">
          <Card>
            <CardContent className="text-center">
              <CardTitle className="mb-4">Address</CardTitle>
              <CardContent>
                <Input placeholder="0xZXc741asD852qWe963" />
              </CardContent>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <CardTitle className="mb-4">Amount</CardTitle>
              <CardContent>
                <MoneyInput />
              </CardContent>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center">
              <CardTitle className="mb-4">Select Token</CardTitle>
              <CardContent>
                <Drawer>
                  <DrawerTrigger>
                    <SelectTokenTrigger />
                  </DrawerTrigger>
                  <DrawerContent className="">
                    <DrawerHeader>
                      <DrawerTitle>Select Token</DrawerTitle>
                      <SelectTokenList />
                    </DrawerHeader>
                  </DrawerContent>
                </Drawer>
              </CardContent>
            </CardContent>
          </Card>
          <CartDetails />
          <Button variant="default" className="mt-8">
            Buy
          </Button>
        </div>
      </ScrollArea>
    </Card>
  );
}
