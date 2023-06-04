import CustomChakra from "@/components/CustomChakra";

import "react-datepicker/dist/react-datepicker.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./globals.css";

import Provider from "@/components/Provider";
import ReactQuery from "@/components/ReactQuery";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Training BPKP",
  description: "NextJs Implementation",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="">
      <head />
      <body>
        <CustomChakra>
          <main>
            <div
              style={{
                overflow: "hidden",
              }}
              className=" h-screen w-screen overflow-visible antialiased text-gray-700 border "
            >
              <section className="h-[10%] w-full">
                <Nav />
              </section>
              <section
                style={{
                  overflow: "hidden",
                }}
                className="h-[90%] w-full "
              >
                {children}
              </section>
            </div>
          </main>
        </CustomChakra>
      </body>
    </html>
  );
}
