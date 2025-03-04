"use client"
import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from "lucide-react";

import { minecraft_builds } from '@/constants/index.js';
import PageOverlay from '@/components/page-overlay';
import Navbar from '@/components/navbar';
import ModeToggle from '@/components/mode-toggle';

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
      <div onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none hover:scale-110 hover:cursor-pointer transition-all duration-200 ease-in-out"
          aria-label="Fermer"
        >
          <X />
        </button>
        <img
          src={src}
          alt="Agrandissement"
          className="max-w-screen max-h-screen"
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
    <section id="minecraft" className="section-container my-20 text-primary">
      <div className="z-0">
        <div className="fixed z-100 inset-x-10 top-10 flex flex-row justify-between pointer-events-none">
          { !isModalOpen &&
          <>
            <a href='/' className="pointer-events-auto hover:cursor-pointer hover:scale-110 transition-all duration-200">
              <ArrowLeft className="mix-blend-difference size-8" />  
            </a>
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

      <div className="relative z-50 pointer-events-none">
        <div className="max-w-7xl mx-14">
          <div className="flex items-center gap-5 mb-10">
            <img
              src="minecraft-icon.png"
              className="h-16"
              alt="Minecraft Icon"
            />
            <h1 className="text-5xl font-gasoekone bg-gradient-to-r dark:from-slate-200 dark:to-slate-400 from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Projets Minecraft
            </h1>
          </div>
          <p>
            Ces constructions proviennent de projets solo et en groupe entre 2019
            et aujourd'hui, sur des serveurs créatifs (lifecraft, hyparia...) et des
            serveurs privés.
          </p>
          <p>
            Tous mes projets ne sont pas encore présents ici, car je n'ai pas toujours
            pensé à les prendre en screenshot pendant leur construction. Je continue
            de les chercher pour mettre à jour cette section.
          </p>
          <p className="font-bold mt-5">
            Dernière mise à jour le: <span className="font-normal">21/11/2024 17:02</span>
          </p>
        </div>

        <div className="max-w-7xl mx-14 mt-10 z-50">
          {minecraft_builds.map((build: any, index: number) => {
            const images = Array.from({ length: build.count }, (_, i) => ({
              src: `/mcbuild/${build.name}${i + 1}.png`,
            }));

            return (
              <div key={index} className="mb-16">
                <h2 className="text-3xl bg-gradient-to-r dark:from-slate-200 dark:to-slate-400 from-slate-800 to-slate-950 bg-clip-text text-transparent font-bold mb-4">
                  {build.title}
                </h2>
                {build.text && <p className="mb-6">{build.text}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-md hover:scale-105 pointer-events-auto transition-transform duration-300 ease-in-out">
                      <img
                        src={image.src}
                        alt={`Image ${idx + 1} de ${build.title}`}
                        className="object-cover w-full h-full transform cursor-pointer"
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
    </section>
  );
};

export default Minecraft;
