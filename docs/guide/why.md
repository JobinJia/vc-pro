# Why Vite

## The Problems

Before ES modules were available in browsers, developers had no native mechanism for authoring JavaScript in a modularized fashion. This is why we are all familiar with the concept of "bundling": using tools that crawl, process and concatenate our source modules into files that can run in the browser.

Over time we have seen tools like [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org) and [Parcel](https://parceljs.org/), which greatly improved the development experience for frontend developers.

However, as we start to build more and more ambitious applications, the amount of JavaScript we are dealing with also increased exponentially. It is not uncommon for large scale projects to contain thousands of modules. We are starting to hit a performance bottleneck for JavaScript based tooling: it can often take an unreasonably long wait (sometimes up to minutes!) to spin up a dev server, and even with HMR, file edits can take a couple seconds to be reflected in the browser. The slow feedback loop can greatly affect developers' productivity and happiness.

Vite aims to address these issues by leveraging new advancements in the ecosystem: the availability of native ES modules in the browser, and the rise of JavaScript tools written in compile-to-native languages.

### Slow Server Start

When cold-starting the dev server, a bundler-based build setup has to eagerly crawl and build your entire application before it can be served.

Vite improves the dev server start time by first dividing the modules in an application into two categories: **dependencies** and **source code**.

- **Dependencies** are mostly plain JavaScript that do not change often during development. Some large dependencies (e.g. component libraries with hundreds of modules) are also quite expensive to process. Dependencies may also be shipped in various module formats (e.g. ESM or CommonJS).