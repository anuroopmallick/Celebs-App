import React, { ReactNode } from "react";
import { Celebs } from "../pages/types/celebs";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  deleteCeleb: (id: number) => void;
  celeb: Celebs | null;
}

const DeleteDialog: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  deleteCeleb,
  celeb,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleDelete = () => {
    deleteCeleb(celeb!.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      <div className="border-2 flex flex-col justify-between bg-white p-2 rounded-lg relative w-4/5 h-32">
        <div className="flex flex-row justify-between">
          <p className="ml-2 mt-2">Are you sure you want to delete? </p>
          <button className="absolute top-0 right-0 m-4 z-10" onClick={onClose}>
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios-glyphs/30/000000/multiply.png"
              alt="multiply"
            ></img>
          </button>
        </div>
        <div className="flex flex-row justify-between mb-2 mr-2">
          <div></div>
          <div className="flex flex-row">
            <button
              className="mr-2 border-2 px-6 py-1 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="border-2 px-6 py-1 bg-orange-500 border-orange-500 text-white rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
