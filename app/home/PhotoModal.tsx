import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface PhotoModalProps {
  setIsPhotoModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    name: string;
    email: string;
    avatar: string | null;
    find_id: string;
  } | null;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ setIsPhotoModal, data }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50"
        onClick={() => setIsPhotoModal(false)}
      >
        <div
          className="bg-white p-8 rounded-lg w-3/4 md:w-1/3 h-1/2 md:h-2/3  overflow-auto relative flex flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => setIsPhotoModal(false)}
            className="absolute top-4 right-4 bg-slate-200 rounded-full p-2 hover:scale-105 cursor-pointer shadow-lg hover:shadow-none transition"
          >
            <X />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-5">
            <div className="w-52 h-52 relative overflow-hidden rounded-full">
              <Image
                src={data?.avatar ? data.avatar : "/Icon.jpeg"}
                alt="ユーザーアバター"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h2 className="text-xl font-bold">{data?.name}</h2>
            <h2 className="text-sm font-extralight whitespace-nowrap">
              {data?.find_id}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoModal;
