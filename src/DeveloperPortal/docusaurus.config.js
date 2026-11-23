// @ts-check
// Docusaurus renders the Markdown in ../../docs (ADR-0007). The docs folder stays the single source.

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pizza Luna Docs',
  tagline: 'Documentation as Code for the Pizza Luna ordering platform',
  url: 'https://docs.pizzaluna.example',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  markdown: {
    // Plain .md files are parsed as CommonMark, so pages stay portable Markdown.
    format: 'detect',
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../../docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          editUrl: 'https://github.com/lunarisdigitalsolutions/lunaris.docs/edit/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '🍕 Pizza Luna Docs',
        items: [
          { type: 'docSidebar', sidebarId: 'user', label: 'User', position: 'left' },
          { type: 'docSidebar', sidebarId: 'domain', label: 'Domain', position: 'left' },
          { type: 'docSidebar', sidebarId: 'development', label: 'Development', position: 'left' },
          { type: 'docSidebar', sidebarId: 'architecture', label: 'Architecture', position: 'left' },
          { type: 'docSidebar', sidebarId: 'operations', label: 'Operations', position: 'left' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: 'Pizza Luna is a fictional company. Demo for "Documentation as Code" by Lunaris Digital Solutions.',
      },
      prism: {
        additionalLanguages: ['bash', 'json', 'csharp', 'powershell'],
      },
      mermaid: {
        theme: { light: 'neutral', dark: 'dark' },
      },
    }),
};

module.exports = config;
