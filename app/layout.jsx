import CustomChakra from "@/components/CustomChakra";
import Provider from "@/components/Provider";
import "react-datepicker/dist/react-datepicker.css";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./globals.css";
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
        <Provider session={session}>
        <CustomChakra>
          <ReactQuery>
            
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
            
          </ReactQuery>
          </CustomChakra>
        </Provider>
      </body>
    </html>
  );
}

// import "./globals.css";
// export default function RootLayout({children}) {
// return(
//   <html>
//     <body>
//       <section className="h-screen w-screen grid grid-cols-3 bg-red-400">
//         <section className="col-span-1 h-full w-full bg-blue-500">ok</section>
//         <section className="col-span-2">{children}</section>
//       </section>
//     </body>
//   </html>
// )
// }
