"use client"
import React, { useState, useEffect } from 'react';
//import ExportedImage from "next-image-export-optimizer";
import { X, ArrowLeft } from "lucide-react";

import { minecraft_builds } from '@/constants/index.js';
import PageOverlay from '@/components/page-overlay';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';
import Image from 'next/image';

interface ImageModalProps {
  src: string;
  onClose: () => void;
}

const Minecraft: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');

  // Composant Modal
  const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => (
    <div
      className="fixed inset-0 z-50 flex items-center bg-black/50 justify-center overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="relative inline-block">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none hover:scale-110 hover:cursor-pointer transition-all duration-200 ease-in-out"
          aria-label="Fermer"
        >
          <X />
        </button>
        <Image
          src={src}
          alt="Agrandissement"
          className="block max-w-screen max-h-screen"
          width={1980}
          height={1080}
          loader={() => src}
        />
      </div>
    </div>
  );

  // Gestion de la fermeture avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <div id="minecraft" className="w-screen overflow-x-hidden">
      <div className="z-0 text-primary">
        <div className="fixed z-100 md:inset-x-10 inset-x-4 top-10 flex flex-row justify-between pointer-events-none">
          { !isModalOpen &&
          <>
            <Link href='/' className="pointer-events-auto hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <ArrowLeft className="mix-blend-difference md:size-8 size-7" />  
            </Link>
            <div className="pointer-events-auto">
              <ModeToggle/>
            </div>
          </>
          }
        </div>

        <div className="fixed inset-0 z-0">
          <PageOverlay/>
        </div>
      </div>

      <div className="relative max-w-full sm:max-w-7xl mx-auto md:my-20 my-5 px-6 z-50 pointer-events-none">

        <div className="flex items-center md:gap-5 gap-3 md:mb-10 mb-8">
          <Image
            src="minecraft-icon.png"
            className="size-16 md:block hidden"
            alt="Minecraft Icon"
            width={64}
            height={64}
            loader={() => "/minecraft-icon.png"}
          />
          <h1 className="md:text-5xl text-4xl md:text-left text-center font-gasoekone bg-gradient-to-r dark:from-slate-200 dark:to-slate-400 from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Projets Minecraft
          </h1>
        </div>
        <div className="flex flex-col gap-4 md:text-base text-sm">
          <p>
            {"Ces constructions proviennent de projets solo et en groupe entre 2019 et aujourd'hui, sur des serveurs créatifs (lifecraft, hyparia...) et des serveurs privés."}
          </p>
          <p>
            {"Tous mes projets ne sont pas encore présents ici. Cette page sera mise à jour à chaque nouvelle trouvaille ou construction."}
          </p>
          <p className="font-bold">
            {"Dernière mise à jour le:"} <span className="font-normal"> {"21/11/2024 17:02"} </span>
          </p>
        </div>

        <div className="mt-10 z-50">
          {minecraft_builds.map((build, index: number) => {
            const images = Array.from({ length: build.count }, (_, i) => ({
              src: `/mcbuild/${build.name}${i + 1}.png`,
            }));

            return (
              <div key={index} className="md:mb-16 mb-10 md:text-base text-sm">
                <h2 className="md:text-3xl text-[1.6rem] bg-gradient-to-r dark:from-slate-200 dark:to-slate-400 from-slate-800 to-slate-950 bg-clip-text text-transparent font-[700] mb-4">
                  {build.title}
                </h2>
                {build.text && <p className="mb-6">{build.text}</p>}
                <div className="grid grid-cols-2 md:grid-cols-3 md:gap-6 gap-1">
                  {images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-md md:hover:scale-105 pointer-events-auto transition-transform duration-300 ease-in-out">
                      <Image
                        src={image.src}
                        alt={`Image ${idx + 1} de ${build.title}`}
                        className="object-cover w-full h-full transform cursor-pointer"
                        width={1980}
                        height={1080}
                        loader={() => image.src}
                        onClick={() => {
                          setSelectedImageSrc(image.src);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ImageModal src={selectedImageSrc} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Minecraft;
