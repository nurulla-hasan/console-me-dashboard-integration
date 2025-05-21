import Image from "next/image";

const Card = ({ handleDelete, handleEdit, cat, idx }) => {
    return (
        <>
            <div className="bg-white p-4 rounded shadow flex flex-col justify-center items-center h-fit">
                <Image
                    src={cat?.icon}
                    alt={cat.name}
                    width={200}
                    height={200}
                    className="w-16 h-16 mx-auto mb-2"
                />
                <h3 className="font-semibold text-lg">{cat.name}</h3>
                <div className="flex justify-center gap-2 mt-2">
                    <button
                        onClick={() => handleDelete(idx)}
                        className="border border-teal-400 text-sm px-3 py-1 rounded text-teal-500 cursor-pointer"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleEdit(idx)}
                        className="bg-teal-500 text-white text-sm px-3 py-1 rounded cursor-pointer"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;


