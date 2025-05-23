import React from 'react';

const Error = ({itemName}) => {
    return (
        <div className="h-full flex items-center justify-center text-red-500 mb-4">
            <p>Failed to load {itemName}</p>
        </div>
    );
};

export default Error;