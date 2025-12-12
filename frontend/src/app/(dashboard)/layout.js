import "@/app/globals.css"
import Sidebar from '@/components/layout/SideBar';

export const metadata = {
  title: "Dashboard",
  description: "School Portal Management",
}

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
