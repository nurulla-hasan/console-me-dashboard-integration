import Image from 'next/image';

const NoData = () => {
    return (
        <>
            <Image
                src='/images/no-data.svg'
                width={500}
                height={500}
                alt="No-Data"
            />
        </>
    );
};

export default NoData;