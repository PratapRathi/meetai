import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar';
import DashboardSidebar from '@/modules/dashboard/ui/components/dashboard-sidebar';
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';
import React from 'react'

interface Props {
    children?: React.ReactNode;
}

const Layout = async ({children}: Props) => {
  const session = await auth.api.getSession({headers: await headers()});
        if(!session) {
            redirect("/sign-in")
        }
  return (
    <SidebarProvider>
        <DashboardSidebar/>
        <main className="flex flex-col h-screen w-screen bg-muted">
          <DashboardNavbar/>
            {children}
        </main>
    </SidebarProvider>
  )
}

export default Layout