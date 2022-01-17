import VcNaiveForm from './VcNaiveForm.vue'
import type { App, Plugin } from 'vue'

VcNaiveForm.install = function (app: App) {
  app.component(VcNaiveForm.name, VcNaiveForm)
  return app
}

export default VcNaiveForm as typeof VcNaiveForm & Plugin

export { useNaiveForm } from './composables/useNaiveForm'

export { defineSchema } from './type'

export type {
  VcNaiveFormSchema,
  VcNaiveFormSchemas,
  NaiveGridFormItemProps,
  VcNaiveFormEmit,
  VcNaiveFormExpose,
  VcNaiveFormProps,
  VcNaiveFormComponentName
} from './type'