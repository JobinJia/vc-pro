import { App } from 'vue'

import TestA from "@/vc-naive/components/TestA";
import TestB from "@/vc-naive/components/TestB";
import VcNaiveForm from '@/vc-naive/components/VcNaiveForm'

const components = [
  TestA,
  TestB,
  VcNaiveForm
]

export function install(app: App) {
  for (const key in components) {
    const item = components[key];
    app.component(item.name || key, item);
  }
}

export default {
  install
}

export {
  TestA,
  TestB,
  VcNaiveForm
}

