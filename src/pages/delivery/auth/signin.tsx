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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    const res = await signIn("UserCredentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/delivery",
    });
  };

  return (
    <div className="w-full h-[calc(100vh_-_4rem)] flex items-center justify-center">
      <Card className="xl:w-1/3 xl:max-w-lg md:w-1/2 w-9/10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Create account and enjoy all functionalities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="email"
              label="E-mail"
              defaultValue="Pedro Duarte"
              {...register("email", { required: true })}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <Button className="hover:bg-transparent bg-transparent text-black hover:text-gray p-0">
              <Link href="/customer/auth/signup">
                Dont have an account? Sign up
              </Link>
            </Button>
            <Button type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
