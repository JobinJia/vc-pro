import { App } from 'vue'

// import TestA from './TestA'
// import TestB from './TestB'
import VcNaiveForm from './VcNaiveForm'

// export * from './VcNaiveForm'

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
