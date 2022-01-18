import VcNaiveForm from './VcNaiveForm.vue'
import type { App } from 'vue'

import { useNaiveForm } from './composables/useNaiveForm'

import { defineSchema } from './type'

VcNaiveForm.install = function (app: App) {
  app.component(VcNaiveForm.name, VcNaiveForm)
  return app
}

export type {
  VcNaiveFormSchema,
  VcNaiveFormSchemas,
  NaiveGridFormItemProps,
  VcNaiveFormEmit,
  VcNaiveFormExpose,
  VcNaiveFormProps,
  VcNaiveFormComponentName
} from './type'

export { useNaiveForm, defineSchema }

export default VcNaiveForm
