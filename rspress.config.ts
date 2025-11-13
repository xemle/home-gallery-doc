import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'HomeGallery Documentation',
  icon: '/favicon.ico',
  logo: {
    light: '/logo.svg',
    dark: '/logo-light.svg',
  },
  logoText: 'HomeGallery',
  route: {
    exclude: [
      'docs/**/files/**/*',
      'src/**'
    ],
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/kbvmvadCwe',
      },
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/xemle/home-gallery',
      },
    ],
  },
  search: {
    codeBlocks: true,
  },
  outDir: path.join(__dirname, 'dist'),
  builderConfig: {
    // Configuration options passed to Rspack
    tools: {
      rspack: (config, { addRules }) => {
        addRules({
          test: /\.ya?ml$/,
          type: 'asset/source', // This loads the file content as a string
        })
        addRules({
          test: /\.out$/,
          type: 'asset/source', // This loads the file content as a string
        })
      },
    },
  },
});
