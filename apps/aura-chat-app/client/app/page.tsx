import {
  type CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import FeatureSection from "@/components/base/feature-section";
import Footer from "@/components/base/footer";
import HeroSection from "@/components/base/hero-section";
import Navbar from "@/components/base/navbar";
import UserReviews from "@/components/base/user-reviews";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session: CustomSession | null = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen  flex-col">
      <Navbar user={session?.user} />

      <HeroSection />

      <FeatureSection />

      <UserReviews />

      <Footer />
    </div>
  );
}
