import { defineConfig } from 'vitepress'
import { resolve } from "path";

export default defineConfig({
  // ...
  title: 'VC-View',
  description: '多UI库组件二开合集',
  lang: 'zh-CN',
  // vite: {
  //   resolve: {
  //     alias: [
  //       {
  //         find: '@',
  //         replacement: resolve(__dirname, '../../../')
  //       }
  //     ]
  //   }
  // },

  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    nav: [
      { text: '起始', link: '/guide/' },
      { text: '组件', link: '/component/' },
      { text: 'composable', link: '/composable/' },
      { text: '相关链接', link: '/link/' },
      {
        text: 'Languages',
        items: [
          {
            text: 'English',
            link: 'https://vitejs.dev'
          },
          {
            text: '简体中文',
            link: 'https://cn.vitejs.dev'
          },
          {
            text: '日本語',
            link: 'https://ja.vitejs.dev'
          }
        ]
      }
    ],

    sidebar: {
      '/config/': 'auto',
      // catch-all fallback
      '/': [
        {
          text: 'Guide',
          children: [
            {
              text: '做这个的初衷',
              link: '/guide/why'
            },
            {
              text: 'Getting Started',
              link: '/guide/'
            },
            {
              text: 'Features',
              link: '/guide/features'
            },
            {
              text: 'Using Plugins',
              link: '/guide/using-plugins'
            },
            {
              text: 'Dependency Pre-Bundling',
              link: '/guide/dep-pre-bundling'
            },
            {
              text: 'Static Asset Handling',
              link: '/guide/assets'
            },
            {
              text: 'Building for Production',
              link: '/guide/build'
            },
            {
              text: 'Deploying a Static Site',
              link: '/guide/static-deploy'
            },
            {
              text: 'Env Variables and Modes',
              link: '/guide/env-and-mode'
            },
            {
              text: 'Server-Side Rendering (SSR)',
              link: '/guide/ssr'
            },
            {
              text: 'Backend Integration',
              link: '/guide/backend-integration'
            },
            {
              text: 'Comparisons',
              link: '/guide/comparisons'
            },
            {
              text: 'Migration from v1',
              link: '/guide/migration'
            }
          ]
        },
        {
          text: 'APIs',
          children: [
            {
              text: 'Plugin API',
              link: '/guide/api-plugin'
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr'
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript'
            },
            {
              text: 'Config Reference',
              link: '/config/'
            }
          ]
        }
      ]
    }
  }
})