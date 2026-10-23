import "./globals.css";

export const metadata = {
  title: "NotePad | Sign in",
  description: "A simple note application with login validation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}