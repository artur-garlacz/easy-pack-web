import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Input } from "@/components/atoms/Input";

export default function SignUp() {
  return (
    <div className="w-full h-[calc(100vh_-_4rem)] flex items-center justify-center">
      <Card className="xl:w-1/3 xl:max-w-lg md:w-1/2 w-9/10">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Create account and enjoy all functionalities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input id="name" label="E-mail" defaultValue="Pedro Duarte" />
          <Input id="username" label="Password" defaultValue="@peduarte" />
        </CardContent>
        <CardFooter className="justify-between">
          <Button className="bg-transparent text-black p-0">
            Already have an account? Sign in
          </Button>
          <Button>Create account</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
