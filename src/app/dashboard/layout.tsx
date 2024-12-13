import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
        <Sidebar/>
        <main className="w-full ml-72">
            <div className="sticky top-0 bg-pink-400 z-[99]">
                <Navbar/>
            </div>
            {children}
        </main>
      </div>
    );
  }
  