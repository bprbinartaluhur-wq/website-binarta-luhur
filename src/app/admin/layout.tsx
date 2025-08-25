import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from './_components/admin-sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <main className="flex-1">
        <SidebarInset>
            <div className="p-4 md:p-6">
                {children}
            </div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
