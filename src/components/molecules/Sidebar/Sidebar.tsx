import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { Button as EpButton } from "@/components/atoms/Button";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { cn } from "@/lib/utils";
import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import { LayoutDashboard, FileBox, Mailbox, Truck } from "lucide-react";
import { Package } from "lucide-react";
import { useRouter } from "next/router";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { user } = useAuthenticatedSession();
  const router = useRouter();
  const isActive = (path: string) =>
    router.pathname === path ? "solid" : "ghost";

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 pb-4">
        <div className="px-3 pb-2">
          <Button
            w="100%"
            px={4}
            py={2}
            alignItems="center"
            justifyContent="start"
            gap={2}
            height="auto"
          >
            <Avatar>
              <AvatarImage src="https://github.com/r.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Flex flexDirection="column">
              <Text fontWeight={600}>
                {user?.data.firstName} {user?.data.lastName}
              </Text>
              <Badge w="fit-content" colorScheme="purple">
                {user?.type}
              </Badge>
            </Flex>
          </Button>
          <h2 className="my-2 px-4 text-lg font-semibold tracking-tight">
            Overview
          </h2>
          <div className="space-y-1">
            <Button
              w="100%"
              justifyContent="start"
              onClick={() => router.push("/delivery")}
              variant={isActive("/delivery")}
            >
              <LayoutDashboard size={20} className="mr-2 text-gray-700" />
              Dashboard
            </Button>
            <Button
              w="100%"
              justifyContent="start"
              onClick={() => router.push("/delivery/requests")}
              variant={isActive("/delivery/requests")}
            >
              <FileBox size={20} className="mr-2 text-gray-700" />
              Requests
            </Button>
            <Button
              w="100%"
              justifyContent="start"
              onClick={() => router.push("/delivery/parcels")}
              variant={isActive("/delivery/parcels")}
            >
              <Package size={20} className="mr-2 text-gray-700" />
              Parcels
            </Button>
            <Button
              w="100%"
              justifyContent="start"
              onClick={() => router.push("/delivery/couriers")}
              variant={isActive("/delivery/couriers")}
            >
              <Mailbox size={20} className="mr-2 text-gray-700" />
              Couriers
            </Button>
            {/* <Button w="100%" justifyContent="start">
              <Truck size={20} className="mr-2 text-gray-700" />
              Vehicles
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
