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
import { useForm } from "react-hook-form";

type ConfirmFormData = {
  email: string;
  code: string;
};

export default function ConfirmAccount() {
  const { register, handleSubmit } = useForm<ConfirmFormData>({
    defaultValues: {
      email: "",
      code: "",
    },
  });

  const onSubmit = async ({ email, code }: ConfirmFormData) => {
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
  };

  return (
    <div className="w-full h-[calc(100vh_-_4rem)] flex items-center justify-center">
      <Card className="xl:w-1/3 xl:max-w-lg md:w-1/2 w-9/10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Confirm an account</CardTitle>
            <CardDescription>
              Verify as account by providing verification code from e-mail
              message.
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
              id="code"
              label="Verification code"
              {...register("code", { required: true })}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <Button type="submit" className="bg-transparent text-black p-0">
              Dont have an account? Sign up
            </Button>
            <Button>Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
