import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'TypeScript Gang of Four Design Patterns',
  tagline: 'Comprehensive implementation of all 23 GoF design patterns in TypeScript',
  url: 'https://nadunys.github.io',
  baseUrl: '/ts-gang-of-four/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config
  organizationName: 'nadunys', // Your GitHub org/user name.
  projectName: 'ts-gang-of-four', // Usually your repo name.

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/nadunys/ts-gang-of-four/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/nadunys/ts-gang-of-four/edit/main/website/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } as any,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'TypeScript GoF Patterns',
      logo: {
        alt: 'TypeScript GoF Design Patterns Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'patternsSidebar',
          position: 'left',
          label: 'Design Patterns',
        },
        {
          href: 'https://github.com/nadunys/ts-gang-of-four',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Design Patterns',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/nadunys/ts-gang-of-four',
            },
          ],
        },
        {
          title: 'References',
          items: [
            {
              label: 'Refactoring.guru',
              href: 'https://refactoring.guru/design-patterns',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TypeScript Gang of Four Design Patterns. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } as any,
};

export default config;