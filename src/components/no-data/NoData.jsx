import Image from 'next/image';

const NoData = ({message}) => {
    return (
        <div className=' flex flex-col justify-center items-center'>
            <h1>{message}</h1>
            <Image
                src='/images/no-data.svg'
                width={500}
                height={500}
                alt="No-Data"
            />

        </div>
    );
};

export default NoData;