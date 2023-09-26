import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
import { FileBox, Mailbox, Truck } from "lucide-react";
import { Package } from "lucide-react";
import { useRouter } from "next/router";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();

  const isActive = (path: string) =>
    router.pathname === path ? "secondary" : "ghost";

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Button
              onClick={() => router.push("/delivery")}
              variant={isActive("/delivery")}
              className="w-full justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              Dashboard
            </Button>
            <Button
              onClick={() => router.push("/delivery")}
              variant={"ghost"}
              className="w-full justify-start"
            >
              <FileBox size={20} className="mr-2 text-gray-700" />
              Requests
            </Button>
            <Button
              onClick={() => router.push("/delivery/parcels")}
              variant={isActive("/delivery/parcels")}
              className="w-full justify-start"
            >
              <Package size={20} className="mr-2 text-gray-700" />
              Parcels
            </Button>
            <Button
              onClick={() => router.push("/delivery/couriers")}
              variant={isActive("/delivery/couriers")}
              className="w-full justify-start"
            >
              <Mailbox size={20} className="mr-2 text-gray-700" />
              Couriers
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Truck size={20} className="mr-2 text-gray-700" />
              Vehicles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
