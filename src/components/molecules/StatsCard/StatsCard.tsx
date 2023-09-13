import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Separator } from "@/components/atoms/Separator";
import { LayoutDashboard } from "lucide-react";

type StatsCardProps = {
  title: string;
  description: string;
};

export default function StatsCard({ title, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="space-y-0 flex-row items-start justify-between">
        <div className="flex flex-col space-y-1.5">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex p-2 rounded-full bg-slate-100">
          <LayoutDashboard className="text-gray-600" />
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />
        <h3 className="text-xl font-medium">400</h3>
      </CardContent>
    </Card>
  );
}
