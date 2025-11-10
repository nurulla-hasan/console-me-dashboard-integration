"use client";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800 p-4">
            <div className="max-w-2xl w-full text-center">
                {/* Medical-themed icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#00a89d] rounded-full mb-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                {/* Large 404 number with better styling */}
                <div className="text-8xl md:text-9xl font-extrabold text-[#00a89d] mb-2">
                    404
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                    Page Not Found
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has moved. Let's get
                    you back on track.
                </p>

                {/* Decorative element */}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-1 bg-[#00a89d] rounded"></div>
                </div>

                {/* Back to Home button with enhanced design */}
                <a
                    href="/"
                    className="inline-block px-8 py-4 bg-[#00a89d] text-white rounded-full hover:bg-[#009a8b] transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-medium text-lg"
                >
                    ← Back to Home
                </a>

                {/* Additional help text */}
                <div className="mt-8 text-gray-500 text-sm">
                    Need help? Contact support@example.com
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
