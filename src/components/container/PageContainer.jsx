

const PageContainer = ({children}) => {
    return (
        <div className='space-y-4 text-[#333333] p-5 h-[calc(100vh-96px)] overflow-auto scrl-hide'>
            {children}
        </div>
    );
};

export default PageContainer;