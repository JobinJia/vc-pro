const base = process.env.NODE_ENV === 'production' ? '/vc-docs' : ''
// const { resolve } = require('path');

module.exports = {
  title: 'vc-docs',
  description: '',
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['vc-naive'],
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'vc-docs'
    // [`vc-docs`]: resolve('../vc-naive/components'),
  },
  base,
  themeConfig: {
    // logo: '../logo.svg',
    nav: [{ text: 'demo', link: '/math' }],
    lang: 'zh-CN',
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'vc-docs',
        description: '',
        label: '中文',
        selectText: '语言',
        nav: [{ text: '指南', link: '/' }],
        sidebar: [
          { text: '介绍', link: '/' },
          { text: 'Button', link: '/components/button/' }
        ]
      },
      '/en/': {
        lang: 'en-US',
        title: 'vc-docs',
        description: '',
        label: 'English',
        selectText: 'Languages',
        nav: [{ text: 'Guide', link: '/' }],
        sidebar: [
          { text: 'Getting Started', link: '/en/' },
          { text: 'Button', link: '/en/components/button/' }
        ]
      }
    },
    search: {
      searchMaxSuggestions: 10
    },
    repo: 'JobinJia/vc-docs',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true
  }
}
