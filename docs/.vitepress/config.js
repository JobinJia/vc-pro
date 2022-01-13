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
      { text: '组件', link: '/components/' },
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
            }
          ]
        }
      ],
      '/components': {
        text: 'vc-naive',
        children: [
          {
            text: '基础用法',
            link: '/components/vc-naive/base-use'
          }
        ]
      }
    }
  }
})
