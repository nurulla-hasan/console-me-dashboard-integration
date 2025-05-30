import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ConsultantModal = ({ showModal, selectedUser, handleReject, handleAccept }) => {
  return (
    <AnimatePresence>
      {showModal && selectedUser && (
        <motion.div
          className="fixed h-[100vh] inset-0 flex justify-center items-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <motion.div
            className="bg-white rounded-sm max-w-lg p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            {/* Header */}
            <div className="bg-[#00a89dbc] rounded-sm flex flex-col justify-center items-center gap-2 mb-4 p-4">
              <Image
                src={selectedUser?.photo_url || "https://avatar.iran.liara.run/public"}
                width={500}
                height={500}
                alt="avatar"
                className="rounded-full w-20 h-20"
              />
              <div className="text-white text-center">
                <h1 className="font-medium text-2xl">{selectedUser?.name}</h1>
                <p className="text-sm mt-2 text-gray-200">{selectedUser?.about}</p>
              </div>
            </div>

            {/* Details */}
            <div className="mb-10 px-6 flex gap-8 justify-between">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{selectedUser?.name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{selectedUser?.phone}</p>
                </div>
                {/* <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{`${selectedUser?.city}, ${selectedUser?.country}`}</p>
                </div> */}
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{selectedUser?.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Service ID</h3>
                  <p>{selectedUser?.service}</p>
                  {/* You can fetch service name here */}
                </div>
              </div>
            </div>

            {/* Optional: NID & Licence */}
            {(selectedUser?.nid || selectedUser?.licence) && (
              <div className="mb-10 px-6">
                <h3 className="font-medium mb-2">NID & Licence</h3>
                <div className="flex gap-3">
                  {selectedUser.nid && (
                    <Image
                      src={selectedUser.nid}
                      width={130}
                      height={120}
                      alt="nid"
                      className="rounded-lg"
                    />
                  )}
                  {selectedUser.licence && (
                    <Image
                      src={selectedUser.licence}
                      width={120}
                      height={120}
                      alt="licence"
                      className="rounded-lg"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between gap-8 px-6">
              <button
                onClick={handleReject}
                className="border text-black text-sm py-1 w-full rounded-sm cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={() => handleAccept(selectedUser?._id)}
                className="bg-teal-600 text-white text-sm py-1 w-full rounded-sm cursor-pointer"
              >
                {
                  selectedUser.account_status === "Banned" ? "Unblock" : "Block"
                }
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConsultantModal;
