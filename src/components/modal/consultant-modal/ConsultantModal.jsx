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
            className="bg-white rounded-xl w-[500px] p-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.1 }}
          >
            {/* Header */}
            <div className="bg-[#00a89dbc] rounded-xl h-52 flex flex-col justify-center items-center gap-2 mb-4">
              <Image
                src={selectedUser?.photo_url || "/placeholder.jpg"}
                width={100}
                height={100}
                alt="avatar"
                className="rounded-full w-20 h-20"
              />
              <div className="text-white text-center">
                <h1 className="font-medium text-2xl">{selectedUser.name}</h1>
                <p>Consultant</p>
              </div>
            </div>

            {/* Details */}
            <div className="mb-10 px-6 flex gap-8 justify-between">
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p>{`${selectedUser.city}, ${selectedUser.country}`}</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Service ID</h3>
                  <p>{selectedUser.service}</p>
                  {/* 🔁 তুমি চাইলে এখানে service নাম fetch করে দেখাতে পারো */}
                </div>
              </div>
            </div>

            {/* Optional: NID & Licence */}
            {(selectedUser.nid || selectedUser.licence) && (
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
                className="border text-black py-2 w-full rounded-md"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="bg-teal-600 text-white py-2 w-full rounded-md"
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
