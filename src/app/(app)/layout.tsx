import WalletProvider from "@/components/provider/walletProvider";
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
        <WalletProvider>{children}</WalletProvider>
      </main>
    </SidebarProvider>
  );
}
