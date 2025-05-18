import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout title="Log in to your account" description="Access your HeartConnect Forum profile and discussions.">
      <LoginForm />
    </AuthLayout>
  );
}
