import SignUpView from "@/components/templates/SignUpView/SignUpView";
import { UserType } from "@/typings/user";

export default function SignUp() {
  return <SignUpView type={UserType.DELIVERY} />;
}
