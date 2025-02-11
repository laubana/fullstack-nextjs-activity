import "./globals.css";

export const metadata = {
  title: "Auth",
  description: "Next.js Authentication",
};

export default ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
