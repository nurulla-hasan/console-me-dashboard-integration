"use client";

import { getLegal } from "@/lib/queries/getLegal";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading/Loading";

const page = () => {
    const { data: legalData, isLoading, isError } = useQuery({
        queryKey: ["legal", "privacy-policy"],
        queryFn: () => getLegal("privacy-policy"),
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Error loading privacy policy</h2>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen text-gray-800">
            {/* Hero Section - Full Width */}
            <div className="bg-gradient-to-r from-[#00a89d] to-[#00a89d] text-white pt-5 pb-16 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00a89d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl max-w-3xl mx-auto text-blue-100">Committed to protecting your health information with the highest standards of security and confidentiality</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 -mt-16 relative z-10">
                    {legalData?.data?.content ? (
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: legalData.data.content }}
                        />
                    ) : (
                        <div className="text-center py-10">
                            <h2 className="text-2xl font-bold text-gray-500">No content available</h2>
                            <p className="text-gray-600 mt-2">Privacy policy content is currently unavailable</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default page;