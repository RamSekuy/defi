import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-100dvh flex flex-col items-center justify-center bg-gradient-to-br from-[#171a20] to-[#23272f] px-4 py-12">
      <div className="bg-white/10 backdrop-blur rounded-xl shadow-lg max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold mb-2 text-center text-primary">
          Help Center
        </h1>
        <p className="mb-6 text-center text-gray-300">
          Welcome to the Ramsekuy Escrow Help Center! Find guides and solutions
          for a safe and easy transaction experience.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary">
            How the Bond System Works
          </h2>
          <p className="text-gray-200 mb-4">
            The <b>bond system</b> in Ramsekuy Escrow is designed to increase
            trust and security for both buyers and sellers. Both parties are
            required to deposit a certain amount of tokens (bond) into the
            escrow contract as a form of commitment to the transaction.
          </p>
          <ul className="list-disc list-inside ml-6 text-gray-200 mb-4">
            <li>
              <b>Seller Bond:</b> The seller deposits a bond to show commitment
              to deliver the goods or services as agreed.
            </li>
            <li>
              <b>Buyer Bond:</b> The buyer also deposits a bond to show
              seriousness in completing the payment and accepting the
              goods/services.
            </li>
            <li>
              <b>Bond Refund:</b> After the transaction is successfully
              completed and confirmed, both bonds are returned to the respective
              parties.
            </li>
            <li>
              <b>Penalty:</b> If one party fails to fulfill their obligations
              (e.g., cancels without reason), their bond may be forfeited
              according to the contract rules.
            </li>
          </ul>
          <p className="text-gray-300">
            This system helps prevent fraud and ensures that both parties have a
            financial stake in the transaction process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Steps to Access Escrow Contract
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-200">
            <li>
              <span className="font-semibold">Connect Wallet:</span> Make sure
              your crypto wallet is connected to the app.
            </li>
            <li>
              <span className="font-semibold">Create or Find Escrow:</span> You
              can create a new escrow contract via the{" "}
              <Link href="/escrow" className="underline text-blue-400">
                Escrow
              </Link>{" "}
              menu or find an existing contract by entering the{" "}
              <span className="font-mono bg-gray-800 px-2 py-1 rounded">
                Contract Address
              </span>
              .
            </li>
            <li>
              <span className="font-semibold">View Escrow Details:</span> After
              selecting an escrow, you will be directed to the contract detail
              page. Here you can see the status, participants, and available
              actions.
            </li>
            <li>
              <span className="font-semibold">Take Action:</span>
              <ul className="list-disc list-inside ml-6">
                <li>
                  <b>Buyer</b> can make a payment if not yet paid.
                </li>
                <li>
                  <b>Seller</b> can cancel the escrow before payment.
                </li>
                <li>
                  After payment, <b>Buyer</b> can click the{" "}
                  <span className="font-mono bg-gray-800 px-2 py-1 rounded">
                    Complete
                  </span>{" "}
                  button to confirm goods/services received.
                </li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Monitor Status:</span> The escrow
              status will automatically update after each action. Refresh the
              page if needed.
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2 text-primary">FAQ</h2>
          <ul className="space-y-2 text-gray-200">
            <li>
              <b>Q:</b> What if a transaction fails?
              <br />
              <b>A:</b> Make sure your token balance and allowance are
              sufficient. Also check your wallet connection and network.
            </li>
            <li>
              <b>Q:</b> Can I cancel an escrow?
              <br />
              <b>A:</b> The seller can cancel the escrow before payment is made.
            </li>
            <li>
              <b>Q:</b> How do I view escrow transaction history?
              <br />
              <b>A:</b> You can view the transaction history on the escrow
              detail page.
            </li>
          </ul>
        </section>

        <div className="text-center">
          <Link
            href="/"
            className="text-blue-400 underline hover:text-blue-300"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
