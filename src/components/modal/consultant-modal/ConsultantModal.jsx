import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ConsultantModal = ({ showModal, selectedUser, handleReject, handleAccept }) => {
  return (
    <AnimatePresence>
      {showModal && selectedUser && (
        <motion.div
          className="fixed h-[100vh] inset-0 flex justify-center items-center bg-black/50 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="bg-white rounded-xl min-w-lg p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            <div className="bg-[#00a89dbc] rounded-xl h-52 flex gap-3 justify-center items-center flex-col mb-4">
              <Image
                src={selectedUser?.avatar}
                width={80}
                height={80}
                alt="avatar"
                className="rounded-full"
              />
              <div className="flex flex-col justify-center items-center text-white">
                <h1 className="font-medium text-2xl">{selectedUser.name}</h1>
                <p>Consultant</p>
              </div>
            </div>
            <div className="mb-10 px-6 flex gap-24">
              <div className="space-y-4 *:space-y-1">
                <div>
                  <h3 className="text-md font-medium">Name</h3>
                  <p className="text-xs">{selectedUser.name}</p>
                </div>
                <div>
                  <h3 className="text-md font-medium">Phone Number</h3>
                  <p className="text-xs">{selectedUser.phone}</p>
                </div>
                <div>
                  <h3 className="text-md font-medium">Location</h3>
                  <p className="text-xs">{selectedUser.location}</p>
                </div>
              </div>

              <div className="space-y-4 *:space-y-1">
                <div>
                  <h3 className="text-md font-medium">Email</h3>
                  <p className="text-xs">{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="text-md font-medium">Consult Service</h3>
                  <p className="text-xs">{selectedUser.service}</p>
                </div>
              </div>
            </div>

            <div className="mb-10 px-6">
              <h3 className="text-md font-medium">NID & Licence</h3>
              <div className="flex gap-3">
                <Image
                  src={selectedUser.nid}
                  width={130}
                  height={120}
                  alt="nid"
                  className="rounded-lg"
                />
                <Image
                  src={selectedUser.licence}
                  width={120}
                  height={120}
                  alt="licence"
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between gap-8 px-6">
              <button
                onClick={handleReject}
                className="border text-black py-2 w-full rounded-md cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="bg-teal-600 text-white py-2 w-full rounded-md cursor-pointer"
              >
                Accept
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultantModal;
