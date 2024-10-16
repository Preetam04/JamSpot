import { getServerSession } from "next-auth";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center">
        {children}
      </main>
    </>
  );
}
