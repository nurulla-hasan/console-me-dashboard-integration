

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="relative inline-block w-20 h-20 text-teal-500">
                <div className="absolute box-border w-16 h-16 m-2 border-8 border-t-transparent border-r-transparent border-current rounded-full animate-spin [animation-delay:-0.45s]" />
                <div className="absolute box-border w-16 h-16 m-2 border-8 border-t-transparent border-r-transparent border-current rounded-full animate-spin [animation-delay:-0.3s]" />
                <div className="absolute box-border w-16 h-16 m-2 border-8 border-t-transparent border-r-transparent border-current rounded-full animate-spin [animation-delay:-0.15s]" />
                <div className="absolute box-border w-16 h-16 m-2 border-8 border-t-transparent border-r-transparent border-current rounded-full animate-spin" />
            </div>
        </div>
    );
};

export default Loading;