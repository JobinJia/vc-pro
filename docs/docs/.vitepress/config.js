const base = process.env.NODE_ENV === 'production' ? '/vc-docs' : '';
const { getRouterConfig } = require('./router');
const { resolve } = require('path');

module.exports = {
  title: 'vc-docs',
  description: 'vc-docs',
  // 扫描srcIncludes里面的 *.md文件
  srcIncludes: ['src'],
  alias: {
    // 为了能在demo中正确的使用  import { X } from 'vc-docs'
    [`vc-docs`]: resolve(__dirname, '../../../src'),
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
        description: 'vc-docs',
        label: '中文',
        selectText: '语言',
        nav: [{ text: '指南', link: '/' }],
        // sidebar: getRouterConfig()
        sidebar: [
          { text: '介绍', link: '/' },
          { text: 'Button', link: '/components/button/' },
          { text: 'VCNaive', link: '/components/vc-naive/' },
        ],
      },
      '/en/': {
        lang: 'en-US',
        title: 'vc-docs',
        description: 'vc-docs',
        label: 'English',
        selectText: 'Languages',
        nav: [{ text: 'Guide', link: '/' }],
        // sidebar: getRouterConfig(),
        sidebar: [
          { text: 'Getting Started', link: '/en/' },
          { text: 'Button', link: '/en/components/button/' },
          { text: 'VCNaive', link: '/en/components/vc-naive/' },
        ],
      },
    },
    search: {
      searchMaxSuggestions: 10,
    },
    repo: 'JobinJia/vc-docs',
    repoLabel: 'Github',
    lastUpdated: true,
    prevLink: true,
    nextLink: true,
  },
};
