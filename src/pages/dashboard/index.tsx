import { DashboardSidebar } from "@/pages/dashboard/dashboardSidebar"
import { DashboardHeader } from "@/pages/dashboard/dashboardHeader";
import { Outlet } from "react-router"

export const Dashboard = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900">
      <DashboardSidebar />
      <DashboardHeader />
      <main className="pl-[280px] pt-16">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
