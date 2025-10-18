import "globals";
import { PatientProvider } from "@/context/PatientContext";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "PGx Platform",
  description: "Pharmacogenomics Digital Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PatientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
          </ThemeProvider>
        </PatientProvider>
      </body>
    </html>
  );
}
