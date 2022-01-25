#!/usr/bin/env zx


const packages = ['../shared', '../vc-composables', '../vc-naive']

for (let i = 0; i < packages.length; i++) {
  await $`pnpm version patch`
}

