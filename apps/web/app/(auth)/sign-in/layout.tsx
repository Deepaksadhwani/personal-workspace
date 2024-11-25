import type React from "react";

interface SignInPageProps {
  children: React.ReactNode
}


const SignInLayout = ({children}:SignInPageProps) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};

export default SignInLayout;
