import AuthForm from "@/components/AuthForm";
import { loginAction } from "@/actions/auth";
export default function Page() { return <AuthForm action={loginAction} />; }
