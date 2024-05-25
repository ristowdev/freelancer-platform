import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    
    return (
        <main className="w-full h-calc-80px">
            <div className="flex">
                <Sidebar />
                <div className="mt-[80px] ml-[300px] w-full pb-[100px]">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default DashboardLayout;