#!/usr/bin/env zx

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra')
const packages = ['../shared', '../vc-composables', '../vc-naive', '../vc-ant']

async function getVersion() {
  for (const dir of packages) {
    const content = await fs.readFile(`${dir}/package.json`, 'utf-8')
    const pkg = JSON.parse(content)
    console.log(`${pkg.name}: => ${pkg.version}`)
  }
}

getVersion()
