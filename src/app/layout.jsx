import "./globals.css";

export const metadata = {
  title: "Klara Portfolio",
  description: "Portfolio Klara Ollivviera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
