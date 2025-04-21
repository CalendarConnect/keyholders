import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn 
        appearance={{
          elements: {
            card: "shadow-md",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
            footerAction: "text-primary hover:text-primary/90",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
} 