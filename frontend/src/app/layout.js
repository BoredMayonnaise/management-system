import "@/app/globals.css"

export const metadata = {
  title: "IIHC Portal",
  description: "School Portal Management",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
