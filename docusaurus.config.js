const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'ThreeFold Manual',
  tagline: 'Documentation for ThreeFold Grid',
  url: 'https://www3.manual.grid.tf',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo_tft_light_short.png',
  organizationName: 'ThreeFold',
  projectName: 'info_grid',
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  scripts: [
    {
      src: '/data/load-values.js',
      async: false,
    },
  ],
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Generate sidebar from folder structure
          sidebarPath: undefined,
          // Please change this to your repo.
          editUrl: 'https://github.com/threefold/manual/edit/main/',

        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/threefold/manual/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  
  customFields: {
    // Configure MDX to handle custom components properly
    mdx: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    webpack: {
      configure: (config) => {
        config.module.rules.push({
          test: /\.md$/,
          type: 'asset/source',
        });
        return config;
      },
    },
  },

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'users',
        path: 'users/docs',
        routeBasePath: 'users',
        // Use auto-generated sidebar based on folder structure
        sidebarPath: undefined,

      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'farmers',
        path: 'farmers/docs',
        routeBasePath: 'farmers',
        // Use auto-generated sidebar based on folder structure
        sidebarPath: undefined,

      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'labs',
        path: 'labs/docs',
        routeBasePath: 'labs',
        // Use auto-generated sidebar based on folder structure
        sidebarPath: undefined,

      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      mermaid: {
        theme: {light: 'neutral', dark: 'forest'},
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'ThreeFold Logo',
          src: 'img/logo_tft_light.png',
          srcDark: 'img/logo_tft_dark.png',
        },
        items: [
          {
            to: '/users/intro',
            position: 'left',
            label: 'Users',
          },
          {
            to: '/farmers/intro',
            position: 'left',
            label: 'Farmers',
          },
          {
            to: '/labs/intro',
            position: 'left',
            label: 'Labs',
          },
          {
            href: 'https://threefold.io',
            label: 'ThreeFold.io',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Users',
                to: '/users/intro',
              },
              {
                label: 'Farmers',
                to: '/farmers/intro',
              },
              {
                label: 'Labs',
                to: '/labs/intro',
              },
            ],
          },
          {
            title: 'Discuss',
            items: [
              {
                label: 'Forum',
                href: 'https://forum.threefold.io',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/threefold',
              },
              {
                label: 'Support',
                href: 'https://threefoldfaq.crisp.help/en/',
              },
            ],
          },
          {
            title: 'Explore',
            items: [
              {
                label: 'AIBox',
                href: 'https://aibox.threefold.io',
              },
              {
                label: 'Mycelium',
                href: 'https://mycelium.threefold.io',
              },
              {
                label: 'Dashboard',
                href: 'https://dashboard.grid.tf',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ThreeFold`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
});
