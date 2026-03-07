// import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Notes ",
  description: "Place for your notes",
  openGraph: {
    title: "Notes",
    description:
      "NoteHub",
    url: "https://notehub.com",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1457,
        height: 1195,
        alt: "NoteHub preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          
          <main>
            {children}
            {modal}
          </main>
          <Footer/>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}




// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   return (

//     <html>

//       <body>

//         <TanStackProvider>

//           <Header />

//           {children}

//           <Footer />

//         </TanStackProvider>

//       </body>

//     </html>

//   );

// }

