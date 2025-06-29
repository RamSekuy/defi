import { Suspense } from "react";
import EscrowDetailsFetch from "../_components/escrowDetailsFetch";
import { LoaderPinwheel } from "lucide-react";

type Props = {
  params: Promise<{
    contractAddress: string;
  }>;
};

export default async function page({ params }: Props) {
  const { contractAddress } = await params;

  const Fb = () => (
    <div className="h-dvh w-full flex justify-center items-center flex-col">
      <h1>Getting Data From Blockchain...</h1>
      <div className="animate-spin">
        <LoaderPinwheel size={64} className="animate-pulse" />
      </div>
    </div>
  );

  return (
    <Suspense fallback={<Fb />}>
      <EscrowDetailsFetch contractAddress={contractAddress} />
    </Suspense>
  );
}
