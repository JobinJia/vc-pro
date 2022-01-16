const base = process.env.NODE_ENV === 'production' ? '/' : ''

const sidebar = [
  {
    text: '组件',
    children: [
      {
        text: 'vc-naive',
        children: [
          {
            text: 'form',
            link: '/components/vc-naive/form/'
          }
        ]
      },
    ]
  }
]

module.exports = {
  title: 'Vc-View',
  description: 'UI Component Plus',
  srcIncludes: ['./vc-naive/components'],
  base,
  themeConfig: {
    lang: 'zh-CN',
    lastUpdated: '最近更新',
    repo: 'JobinJia/vc-view',
    repoLabel: 'Github',
    prevLink: true,
    nextLink: true,
    alias: {
      // 'naive-ui': './node_modules/naive-ui',
      // '@vc-view/vc-naive': './vc-naive/components/'
    },
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'vc-view',
        description: 'vue hooks',
        label: '中文',
        selectText: 'Languages',
        nav: [
          { text: '指南', link: '/' },
          { text: '组件', link: '/components/vc-naive/form/' }
        ],
        // sidebar
      },
      '/components/': {
        nav: [
          { text: '指南', link: '/' },
          { text: '组件', link: '/components/vc-naive/form/' }
        ],
        sidebar
      }
    }
  }
}