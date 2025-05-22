import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { LuSettings } from 'react-icons/lu';
import { MdOutlineLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isHideLayout, menuItems, setSettingsOpen, settingsOpen, settingMenu, pathname, }) => {

    const router = useRouter()
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        router.push('/auth/login')
    }

    return (
        <>
            <aside className={`${isHideLayout ? "hidden" : ""} w-62  flex flex-col justify-between pb-10 bg-[#dbf8f8]`}>
                <div>
                    {/* Logo */}
                    <div className="flex items-center justify-center">
                        <img src="/images/logo3.png" width={130} height={65} alt="Logo" />
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2 font-medium px-2">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-4 py-3 rounded-sm transition-all duration-300 ${isActive
                                        ? "bg-[#00A89D] text-white"
                                        : "text-[#00A89D] hover:bg-[#00A89D] bg-[#FEFEFE] hover:text-white"
                                        }`}
                                >
                                    <span className='flex text-sm items-center gap-2'>
                                        {item.icon}
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}

                        {/* Settings dropdown */}
                        <div>
                            <button
                                onClick={() => setSettingsOpen(!settingsOpen)}
                                className={`w-full cursor-pointer text-left px-4 py-2 rounded-sm text-[#00A89D] flex justify-between items-center transition-all duration-300 ${settingsOpen ? "bg-[#058279] text-white" : "bg-[#FEFEFE]"}`}
                            >
                                <p className='flex items-center gap-2 text-sm'>
                                    <LuSettings size={20} />
                                    <span>Settings</span>
                                </p>
                                <span>{settingsOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}</span>
                            </button>

                            <AnimatePresence initial={false}>
                                {settingsOpen && (
                                    <motion.div
                                        className="flex flex-col gap-1 font-medium mt-1 pr-5"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {settingMenu.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <Link
                                                    key={item.label}
                                                    href={item.href}
                                                    className={`px-4 py-2 text-lg rounded-sm transition-colors duration-200 ${isActive
                                                        ? "bg-[#058279] text-white"
                                                        : "text-[#00A89D] hover:bg-[#00A89D] bg-[#FEFEFE] hover:text-white"
                                                        }`}
                                                >
                                                    <span className='text-sm'>{item.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>
                </div>

                <button onClick={handleLogout} className="text-[#00A89D] bg-[#FEFEFE] text-sm py-3 flex gap-2 pl-3 mx-2 items-center cursor-pointer">
                    <MdOutlineLogout size={20} />
                    <span className='text-md font-medium'>Log out</span>
                </button>
            </aside>
        </>
    );
};

export default Sidebar;