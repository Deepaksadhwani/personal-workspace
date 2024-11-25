import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="bg-neutral-100 min-h-screen">
        <div className=" max-w-screen-2xl mx-auto p-4">
        {children}
        </div>
     
    </main>
  );
};

export default AuthLayout;
