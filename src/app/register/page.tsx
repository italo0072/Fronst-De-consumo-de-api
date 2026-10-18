import AuthForm from "@/components/AuthForm";
import { registerAction } from "@/actions/auth";
export default function Page() { return <AuthForm action={registerAction} register />; }
