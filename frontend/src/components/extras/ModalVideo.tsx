import React from "react";
import ReactPlayer from "react-player";

interface ModalVideoProps {
    isOpen: boolean,
    onClose: () => void,
    videoSrc: string
}

export const ModalVideo: React.FC<ModalVideoProps> = ({ isOpen, onClose, videoSrc }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
            onClick={onClose}
        >
            <div
                className="relative bg-black rounded-lg max-w-3xl"
                onClick={(e) => e.stopPropagation()}
            >
                <ReactPlayer url={videoSrc} controls={true} width={750} height={500}/>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 font-semibold text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                >
                    X
                </button>
            </div>
        </div>
    );
};
