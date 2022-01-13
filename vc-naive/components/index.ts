import { App } from 'vue'

import TestA from './TestA'
import TestB from './TestB'
import Button from './button'
import VcNaiveForm from './VcNaiveForm'

const components = [TestA, TestB, VcNaiveForm, Button]

export function install(app: App) {
  for (const key in components) {
    const item = components[key]
    app.component(item.name || key, item)
  }
}

export default {
  install
}

export { TestA, TestB, VcNaiveForm, Button }
