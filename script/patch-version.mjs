#!/usr/bin/env zx


const packages = ['../shared', '../vc-composables', '../vc-naive']

for (let i = 0; i < packages.length; i++) {
  cd(packages[i])
  await $`pnpm version patch --allow-same-version=false --git-tag-version=false`
}

