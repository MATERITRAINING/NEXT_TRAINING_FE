import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: "Ihsan",
  description: "testing",
};

export default function RootLayout({ children, session }) {
  return (
    <section className="w-full flex-center flex-col">
      <Link href={"/app-ssr"}>Kembali</Link>
      <h1 className="head_text text-center">
        SSR Componennt
        <br className="max-md:hidden" />
      </h1>
      {children}
    </section>
  );
}
