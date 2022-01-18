import VcNaiveForm from './VcNaiveForm.vue'
import type { App, Plugin } from 'vue'

import { useNaiveForm } from './composables/useNaiveForm'

import { defineSchema } from './type'

VcNaiveForm.install = function (app: App) {
  app.component(VcNaiveForm.name, VcNaiveForm)
  return app
}

export { useNaiveForm, defineSchema, VcNaiveForm }

export type {
  VcNaiveFormSchema,
  VcNaiveFormSchemas,
  NaiveGridFormItemProps,
  VcNaiveFormEmit,
  VcNaiveFormExpose,
  VcNaiveFormProps,
  VcNaiveFormComponentName
} from './type'

export default VcNaiveForm as typeof VcNaiveForm & Plugin
