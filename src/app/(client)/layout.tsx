import Footer from "@/components/Footer/footer";
import NavBarContainer from "@/components/NavBar/navBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vente et Location d’Écrans LED Haute Qualité | Elysium",
  description:
    "Achetez ou louez des écrans LED haute qualité pour vos événements, vitrines et campagnes. Solutions sur mesure avec Elysium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBarContainer></NavBarContainer>
      {children}
      <Footer />
      <div className="h-2 bg-primary-500"></div>
    </>
  );
}
