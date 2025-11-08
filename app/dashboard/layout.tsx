import Navbar from "@/components/Navbar";
import Rightbar from "@/components/Rightbar";
import Sidebar from "@/components/Sidebar";
import {Toaster} from '@/components/ui/sonner'
export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex">
         <Sidebar />
         <main className="w-full flex flex-col gap-4 p-3">
            <Navbar />
            <section className="grid grid-cols-[69%,29%] gap-5 w-full">
               {children}
               <Rightbar />
            </section>
         </main>
         <Toaster />
      </div>
   );
}