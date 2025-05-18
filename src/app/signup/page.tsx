import { SignupForm } from "@/components/auth/SignupForm";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SignupPage() {
  return (
    <AuthLayout title="Join HeartConnect Forum" description="Create your account to start connecting.">
      <SignupForm />
    </AuthLayout>
  );
}
