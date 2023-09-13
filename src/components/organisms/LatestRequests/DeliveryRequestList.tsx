import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";

export default function DeliveryRequestList() {
  return (
    <ul className="list-none flex flex-col gap-y-3">
      <li>
        <Card>
          <CardHeader>
            <CardTitle>eloo</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </li>
      <li>
        <Card>
          <CardHeader>
            <CardTitle>eloo</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </li>
    </ul>
  );
}

function DeliveryRequestItem() {
  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle>eloo</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </li>
  );
}
