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
import { useToast } from "@/components/atoms/use-toast";
import { useAuthenticatedSession } from "@/hooks/useAuthenticatedSession";
import { useErrorToast } from "@/hooks/useToast/useErrorToast";
import { customerRepository } from "@/repositories/customer-repository";
import { userRepository } from "@/repositories/user-repository";
import { SignUpFormData } from "@/typings/auth";
import { UserType } from "@/typings/user";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function SignUpView({ type }: { type: UserType }) {
  const { register, handleSubmit } = useForm<SignUpFormData>({
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });
  const customerRepo = customerRepository({});
  const userRepo = userRepository({});
  const { toast } = useToast();
  const { push } = useRouter();
  const errorToast = useErrorToast();
  const isCustomer = type === UserType.CUSTOMER;

  const signUpCustomer = useMutation(
    (payload: SignUpFormData) => {
      const signUp = isCustomer
        ? customerRepo.signUpCustomer
        : userRepo.signUpUser;
      return signUp(payload);
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Successfully registered",
          status: "success",
        });
        const redirectUrl = isCustomer
          ? "/customer/auth/signin"
          : "/delivery/auth/signin";
        push(redirectUrl);
      },
      onError: (e) => {
        errorToast({
          message: "An error has occured when trying to sign up",
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (values: SignUpFormData) => {
    signUpCustomer.mutate({ ...values });
  });

  return (
    <div className="w-full h-[calc(100vh_-_4rem)] flex items-center justify-center">
      <Card className="xl:w-1/3 xl:max-w-lg md:w-1/2 w-9/10">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create account and enjoy all functionalities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              id="firstName"
              label="First name"
              placeholder="Joe"
              {...register("firstName", { required: true })}
            />
            <Input
              id="lastName"
              label="Last name"
              placeholder="Doe"
              {...register("lastName", { required: true })}
            />
            <Input
              id="email"
              label="E-mail"
              placeholder="joe.doe@gmail.com"
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
            <Button
              type="button"
              className="hover:bg-transparent bg-transparent text-black hover:text-gray p-0"
            >
              <Link href="/customer/auth/signin">
                Already have an account? Sign in
              </Link>
            </Button>
            <Button type="submit">Sign up</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
