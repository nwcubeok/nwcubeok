import React from 'react';

import Minecraft from '@/sections/Minecraft';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'nwcubeok | minecraft',
};

const MinecraftPage: React.FC = () => {
  return (
    <Minecraft/>
  );
};

export default MinecraftPage;
