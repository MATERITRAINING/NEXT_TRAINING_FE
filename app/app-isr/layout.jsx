import Nav from "@/components/Nav";
import Link from "next/link";

export const metadata = {
  title: {
    default : 'ISR',
    template : '%s | ISR',

  },
  description: "testing",
};

export default function RootLayout({ children, session }) {
  return (
    <section className="w-full flex-center flex-col">
      <Link href={"/app-isr"}>Kembali</Link>
      <h1 className="head_text text-center">
        ISR Componennt
        <br className="max-md:hidden" />
      </h1>
      {children}
    </section>
  );
}
