import VcAntForm from './VcAntForm'
import { App } from 'vue'

const components = [VcAntForm]

export function install(app: App) {
  for (const key in components) {
    const item = components[key]
    app.component(item.name || key, item)
  }
}

export default {
  install
}

export { VcAntForm }

export * from './VcAntForm'
