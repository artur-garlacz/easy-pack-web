import { Sidebar } from "@/components/molecules/Sidebar/Sidebar";
import { PropsWithChildren } from "react";

export function DeliveryDashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="hidden md:block">
      <div className="h-screen grid">
        <Sidebar className="hidden lg:block fixed top-16 w-[260px] h-full lg:border-r" />
        <div className="pl-[260px]">
          <div className="w-full h-full px-4 py-6 lg:px-6 bg-slate-100">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
