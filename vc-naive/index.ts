import { App } from 'vue'

import VcNaiveForm from './VcNaiveForm'

const components = [VcNaiveForm]

export function install(app: App) {
  for (const key in components) {
    const item = components[key]
    app.component(item.name || key, item)
  }
}

export default {
  install
}

export { VcNaiveForm }

// types

export type {
  VcNaiveFormSchema,
  VcNaiveFormSchemas,
  NaiveGridFormItemProps,
  VcNaiveFormEmit,
  VcNaiveFormExpose,
  VcNaiveFormProps,
  VcNaiveFormComponentName
} from './VcNaiveForm'
