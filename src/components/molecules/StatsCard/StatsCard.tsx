// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/atoms/Card";
import { Separator } from "@/components/atoms/Separator";
import { Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import { LayoutDashboard } from "lucide-react";

type StatsCardProps = {
  title: string;
  description: string;
  loading?: boolean;
  value?: number;
};

export default function StatsCard({
  title,
  description,
  loading = false,
  value = 0,
}: StatsCardProps) {
  return (
    <Card
      direction={{ base: "row", sm: "row" }}
      overflow="hidden"
      variant="outline"
      p={4}
    >
      <div className="flex p-2 rounded-full bg-slate-100">
        <LayoutDashboard className="text-gray-600" />
      </div>
      {/* <CardHeader className="flex space-y-0 flex-row items-start justify-between"> */}
      <div className="flex flex-col space-y-1.5">
        <Text fontWeight={600} fontSize={18}>
          {title}
        </Text>
        <Text>{description}</Text>
      </div>

      {/* </CardHeader> */}
      {/* <CardBody>
        <h3 className="text-xl font-medium">{value}</h3>
      </CardBody> */}
    </Card>
  );
}
