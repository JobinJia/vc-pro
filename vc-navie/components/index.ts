import { App } from 'vue'

import TestA from "@/vc-navie/components/TestA";
import TestB from "@/vc-navie/components/TestB";

const components = [
  TestA,
  TestB
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
  TestB
}

