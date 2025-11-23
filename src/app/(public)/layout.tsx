import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StarfieldBackground } from "@/components/starfield-background";
import { SocialSidebar } from "@/components/social-sidebar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StarfieldBackground />
      <SocialSidebar />
      <div className="relative z-10">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  );
}
