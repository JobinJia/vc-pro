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
      {
        text: 'vc-ant',
        children: [
          {
            text: 'form',
            link: '/components/vc-ant/form/'
          }
        ]
      }
    ]
  }
]

module.exports = {
  title: 'vc-pro',
  description: 'UI Component Plus',
  srcIncludes: ['./vc-naive', './vc-ant'],
  base,
  themeConfig: {
    lang: 'zh-CN',
    lastUpdated: '最近更新',
    repo: 'JobinJia/vc-pro',
    repoLabel: 'Github',
    prevLink: true,
    nextLink: true,
    alias: {
      // 'naive-ui': './node_modules/naive-ui',
      // '@vc-pro/vc-naive': './vc-naive/'
      // '@vc-pro/vc-naive': resolve('./vc-naive/')
    },
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'vc-pro',
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
