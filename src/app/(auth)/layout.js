import PublicRoute from "@/components/public-route/PublicRoute";

export default function AuthLayout({ children }) {
    return (
        <>
            <div className="bg-[#E6F8F7]">
                <PublicRoute>
                    {children}
                </PublicRoute>
            </div>
        </>
    );
}