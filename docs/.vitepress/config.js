const { resolve } = require('path')
module.exports = {
  title: 'Vc-View',
  description: 'Just playing around.',
  srcIncludes: ['./docs/src'],
  // alias: {
  //   '@vc-view/vc-naive': resolve(__dirname, '../vc-naive')
  // },
  base: '/',

  themeConfig: {
    lang: 'en-US',
    lastUpdated: '最近更新',
    repo: 'JobinJia/vc-view',
    repoLabel: 'Github',
    prevLink: true,
    nextLink: true,

    nav: [{ text: 'demo', link: '/math' }],
    lang: 'zh-CN',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'vc-view',
        description: 'vc-view',
        label: '中文',
        selectText: '语言',
        nav: [
          { text: '指南', link: '/' },
          { text: '组件', link: `/components/vc-naive` }
        ],
        sidebar: [
          {
            text: '表单',
            link: '/components/vc-naive/form'
          }
        ]
      },
      '/en/': {
        lang: 'en-US',
        title: 'vc-view',
        description: 'vc-view',
        label: 'English',
        selectText: 'Languages',
        nav: [
          { text: 'Guide', link: '/en/' },
          { text: 'Component', link: '/en/components/vc-naive' }
        ],
        sidebar: [
          {
            text: 'form',
            link: '/en/components/vc-naive/form'
          }
        ]
      }
    }
  }
}
