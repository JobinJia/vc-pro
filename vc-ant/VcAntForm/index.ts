import VcAntForm from './VcAntForm.vue'

import type { App } from 'vue'

import { defineSchema } from './type'

VcAntForm.install = function (app: App) {
  app.component(VcAntForm.name, VcAntForm)
  return app
}

export type {
  VcAntFormSchema,
  VcAntFormSchemas,
  // AntGridFormItemProps,
  // VcAntFormEmit,
  // VcAntFormExpose,
  VcAntFormProps,
  VcAntFormComponentName
} from './type'

export { defineSchema }

export default VcAntForm
