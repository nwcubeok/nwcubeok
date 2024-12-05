import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config) {
    // Trouver la règle existante qui gère les fichiers SVG
    const fileLoaderRule = config.module.rules.find((rule: { test: { test: (arg0: string) => any; }; }) => {
      return (
        rule &&
        typeof rule === 'object' &&
        rule.test instanceof RegExp &&
        rule.test.test('.svg')
      );
    });

    // Exclure les SVG de cette règle
    if (fileLoaderRule && typeof fileLoaderRule !== 'string') {
      if (!fileLoaderRule.exclude) {
        fileLoaderRule.exclude = [/\.svg$/];
      } else if (Array.isArray(fileLoaderRule.exclude)) {
        fileLoaderRule.exclude.push(/\.svg$/);
      } else {
        fileLoaderRule.exclude = [fileLoaderRule.exclude, /\.svg$/];
      }
    }

    // Ajouter une nouvelle règle pour gérer les SVG avec @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
