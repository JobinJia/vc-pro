import { App } from 'vue'

import TestA from "@/naive-ui/components/TestA";
import TestB from "@/naive-ui/components/TestB";

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

