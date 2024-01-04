import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/Avatar";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { cn } from "@/lib/utils";
import { Badge, Button, Flex, Text } from "@chakra-ui/react";
import { LayoutDashboard, Mailbox, Truck } from "lucide-react";
import { Package } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const { user, isAuthenticated } = useAuthenticatedSession();

  const router = useRouter();
  const isActive = (path: string) =>
    router.pathname === path ? "solid" : "ghost";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/delivery/auth/signin");
    }
  }, [isAuthenticated]);

  return (
    <div className={cn("pt-8", className)}>
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
              <Badge w="fit-content" lineHeight="initial" colorScheme="purple">
                {user?.data.role}
              </Badge>
            </Flex>
          </Button>
          <h2 className="mb-2 mt-4 px-4 text-lg font-semibold tracking-tight">
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
            <Button
              w="100%"
              justifyContent="start"
              onClick={() => router.push("/delivery/fleet")}
              variant={isActive("/delivery/fleet")}
            >
              <Truck size={20} className="mr-2 text-gray-700" />
              Fleet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
