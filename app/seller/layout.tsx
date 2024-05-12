import Header from "@/components/Header";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const SellerLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            {children}
        </main>
    );
}

export default SellerLayout;