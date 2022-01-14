const { kebabCase } = require('lodash');

const Router = {
  // Request: ['useRequest', 'useAxios'],
  // Dom: [
  //   'useSize',
  //   'useKeyPress',
  //   'useFullscreen',
  //   'useDocumentVisibility',
  //   'useHover',
  //   'useInViewport',
  // ],
  // State: [
  //   'useUrlState',
  //   'useToggle',
  //   'useLocalStorageState',
  //   // 'useLocalforage',
  //   'useThrottle',
  //   'useDebounce',
  // ],
  // Data: ['useTable'],
  // Worker: ['useWorkerFunction'],
  'Test': ['button'],
  'Vc-Naive': [
    'vc-naive'
  ]
};

// const Router = {
//   'VcNaive': {
//     'Form': [
//       ''
//     ]
//   }
// }

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: langPrefix === '/' ? 'Getting started' : '介绍',
      link: `${langPrefix}`,
    },
    ...Object.entries(Router).map(([text, children]) => ({
      text,
      children: children.map(hookName => ({
        link: `${langPrefix}${kebabCase(hookName)}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  getRouterConfig,
};