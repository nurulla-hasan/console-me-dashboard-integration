
"use client";
import React from "react";

export default function Pagination({ page, setPage, pageCount }) {
    const pages = [];
    const range = 2;

    for (
        let i = Math.max(page - range, 1);
        i <= Math.min(page + range, pageCount);
        i++
    ) {
        pages.push(i);
    }

    const showEllipsisBefore = pages[0] > 2;
    const showEllipsisAfter = pages[pages.length - 1] < pageCount - 1;

    return (
        <div className="flex items-center justify-center gap-2">
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="disabled:text-gray-400 disabled:cursor-not-allowed cursor-pointer text-sm"
            >
                &lt; Prev
            </button>

            {showEllipsisBefore && (
                <>
                    <button
                        onClick={() => setPage(1)}
                        className="w-6 h-6 rounded-full text-center text-sm cursor-pointer"
                    >
                        1
                    </button>
                    <span>...</span>
                </>
            )}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-6 h-6 rounded-full text-center text-sm cursor-pointer ${p === page
                        ? "bg-teal-600 text-white"
                        : ""
                        }`}
                >
                    {p}
                </button>
            ))}

            {showEllipsisAfter && (
                <>
                    <span>...</span>
                    <button
                        onClick={() => setPage(pageCount)}
                        className="w-7 h-7 rounded-full text-center text-sm cursor-pointer"
                    >
                        {pageCount}
                    </button>
                </>
            )}

            <button
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
                Next &gt;
            </button>
        </div>
    );
}
