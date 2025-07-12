import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import axios from "axios";
import crypto from "crypto";
import { Bitcoin, Handshake } from "lucide-react";
const items = [
  {
    title: "Buy Token",
    url: "/buy",
    icon: Bitcoin,
  },
  {
    title: "Escrow Contract",
    url: "/escrow",
    icon: Handshake,
  },
  {
    title: "Help",
    url: "/help",
    icon: Handshake,
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const payload = {
    transaction_time: "2020-01-09 18:27:19",
    transaction_status: "settlement",
    transaction_id: "57d5293c-e65f-4a29-95e4-5959c3fa335b",
    status_message: "midtrans payment notification",
    status_code: "200",
    payment_type: "credit_card",
    order_id: "Postman-1578568851",
    merchant_id: "G141532850",
    gross_amount: "10000.00",
    currency: "IDR",
    signature_key: "",
  };
  const MIDTRANS_SERVER_KEY = "SB-Mid-server-wN8gujonkRTr17j82iHpVkbw";
  const endpoint = "http://localhost:3000/api/p0";
  // Hitung signature_key sesuai dokumen Midtrans
  const rawSignature = `${payload.order_id}${payload.status_code}${payload.gross_amount}${MIDTRANS_SERVER_KEY}`;
  const signature_key = crypto
    .createHash("sha512")
    .update(rawSignature)
    .digest("hex");

  // Tambahkan signature ke payload
  payload.signature_key = signature_key;

  // Kirim POST request
  async function sendNotification() {
    try {
      const res = await axios.post(endpoint, payload, {
        headers: {
          "User-Agent": "Veritrans",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log("✅ Notification sent!");
      console.log("Status:", res.status);
      console.log("Response:", res.data);
    } catch (e) {
      const err = e as any;
      console.error("❌ Error sending notification:", err.message);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Body:", err.response.data);
      }
    }
  }

  // sendNotification();
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="text-primary">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary mb-4">
              Service
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="flex justify-center w-full">
        <SidebarTrigger className="z-90 top-5 right-5 fixed scale-125" />
        {children}
      </main>
    </SidebarProvider>
  );
}
