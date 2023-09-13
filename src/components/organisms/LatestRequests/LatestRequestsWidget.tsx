import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { ArrowRight } from "lucide-react";

export default function LatestRequestsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest requests</CardTitle>
        <CardDescription>
          Latest requests are waiting for approval
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <RequestItem />
          <RequestItem />
          <RequestItem />
          <RequestItem />
        </div>
      </CardContent>
      <CardFooter>See all</CardFooter>
    </Card>
  );
}

function RequestItem() {
  return (
    <div className="flex justify-between items-center rounded-md hover:cursor-pointer hover:bg-secondary/80 p-2">
      <div className="flex flex-col">
        <h3 className="font-medium">New #1</h3>
        <p>Testing</p>
      </div>
      <ArrowRight />
    </div>
  );
}
