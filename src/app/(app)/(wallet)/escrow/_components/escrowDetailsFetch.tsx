import { CardContent } from "@/components/ui/card";
import InteractionEscowDetails from "./interactionEscowDetails";
import {
  escrowContractReadOnly,
  escrowFactoryReadOnly,
} from "@/smartContract/config";
import { formatUnits } from "ethers";
import { getTokenDecimals } from "@/lib/utils";

type Props = {
  contractAddress: string;
};

export default async function EscrowDetailsFetch({ contractAddress }: Props) {
  const factory = escrowFactoryReadOnly();
  //   const allEscrows = await factory.getAllEscrows();
  const isEscrow = await factory.isEscrow(contractAddress);
  if (!isEscrow) {
    return (
      <div className="min-h-100dvh flex flex-col justify-center items-center w-full">
        <h1 className="text-lg mb-4 text-red-500">Invalid Escrow Contract</h1>
        <p>Contract address is not registered in the factory.</p>
      </div>
    );
  }
  const escrow = escrowContractReadOnly(contractAddress);

  // Ambil decimals token
  const tokenAddress = await escrow.token();
  const decimals = await getTokenDecimals(tokenAddress);

  const details = {
    buyer: await escrow.buyer(),
    buyerBond: formatUnits(await escrow.buyerBondAmount(), decimals),
    seller: await escrow.seller(),
    sellerBond: formatUnits(await escrow.sellerBondAmount(), decimals),
    token: tokenAddress,
    price: formatUnits(await escrow.price(), decimals),
    feePercent: (await escrow.feePercent()).toString(),
    isReleased: await escrow.isReleased(),
    isPaid: await escrow.isPaid(),
  };
  return (
    <div className="min-h-100dvh flex flex-col justify-center items-center w-full md:max-w-[50dvw] px-4">
      <h1 className="text-lg mb-4">Escrow Contract : {contractAddress}</h1>
      <CardContent className="w-full flex flex-col">
        <InteractionEscowDetails
          address={contractAddress}
          details={details}
          decimal={decimals}
        />
      </CardContent>
    </div>
  );
}
