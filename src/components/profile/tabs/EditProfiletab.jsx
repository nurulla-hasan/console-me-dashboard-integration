import { ImSpinner9 } from "react-icons/im";


const EditProfiletab = ({activeTab, handleSubmit, onSubmitProfile, register, user, loading}) => {
    return ( 
        <>
            {activeTab === 'profile' && (
                <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-4">
                    <h3 className='text-xl font-medium text-center'>
                        Edit Your Profile
                    </h3>

                    <div>
                        <label className="block mb-1 font-medium">User Name</label>
                        <input
                            type="text"
                            placeholder={user?.name}
                            {...register('name')}
                            className="w-full border border-teal-400 rounded-xl p-2 outline-none placeholder:text-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder={user?.email}
                            disabled 
                            {...register('email')}
                            className="w-full border border-teal-400 rounded-xl p-2 outline-none disabled:text-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Contact No</label>
                        <input
                            type="text"
                            placeholder={user?.phone}
                            {...register('phone')}
                            className="w-full border border-teal-400 rounded-xl p-2 outline-none placeholder:text-black"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Address</label>
                        <input
                            type="text"
                            placeholder={user?.city}
                            {...register('city')}
                            className="w-full border border-teal-400 rounded-xl p-2 outline-none placeholder:text-black"
                        />
                    </div>

                    <div className='w-full text-center'>
                        <button type="submit" disabled={loading} className="disabled:cursor-not-allowed mt-4 px-8 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-xl cursor-pointer">
                            {
                                loading ? <ImSpinner9 size={20} className="animate-spin"/> : 'Save Changes'
                            }
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditProfiletab;