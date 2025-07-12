"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import CreateEscortContract from "./createEscortContract";
import InteractEscowContract from "./interactEscowContract";

export default function ContractTabs() {
  const [dialog, setDialog] = useState<"create" | "interact" | null>(null);
  return (
    <>
      <Menu
        onCreate={() => setDialog("create")}
        onInteract={() => setDialog("interact")}
      />

      <Dialog open={dialog === "create"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="pt-12">
          <CreateEscortContract />
        </DialogContent>
      </Dialog>
      <Dialog open={dialog === "interact"} onOpenChange={() => setDialog(null)}>
        <DialogContent className="pt-12">
          <InteractEscowContract />
        </DialogContent>
      </Dialog>
    </>
  );
}

const Menu = ({
  onCreate,
  onInteract,
}: {
  onCreate: () => void;
  onInteract: () => void;
}) => (
  <Card className="max-w-md mx-auto">
    <CardContent className="text-center">
      <CardTitle className="mb-4">Escow Contract</CardTitle>
      <div className="flex gap-4 justify-center">
        <Button onClick={onCreate}>Create Contract</Button>
        <Button onClick={onInteract}>Interact Contract</Button>
      </div>
    </CardContent>
  </Card>
);
