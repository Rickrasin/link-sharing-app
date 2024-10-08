import { Instrument_Sans } from "next/font/google";
import "./globals.css";

// Configuração das fontes InstrumentSans com suporte para variável e estilos específicos
const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic", "normal"]
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${InstrumentSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
