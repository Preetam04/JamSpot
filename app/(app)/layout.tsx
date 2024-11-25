import Checker from "../../components/auth-checker";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Checker>
      {/* <Sidebar /> */}
      <>
        <main className="w-full h-screen flex flex-col items-center">
          {/* make a side bar */}
          {children}
        </main>
      </>
    </Checker>
  );
}
