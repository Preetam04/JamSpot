import Navbar from "@/components/Navbar";
import Checker from "../../components/auth-checker";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Checker>
      {/* <Sidebar /> */}
      <Navbar />
      <>
        <main className="w-full h-screen flex flex-col items-center">
          {/* make a side bar */}
          {children}
        </main>
      </>
    </Checker>
  );
}
