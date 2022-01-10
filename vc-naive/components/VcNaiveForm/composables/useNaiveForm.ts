import { VcNaiveFormExpose, VcNaiveFormProps } from '@/vc-naive/components/VcNaiveForm/type'
import { effectScope, onScopeDispose, ref, Ref, unref, watchEffect } from 'vue'

export function useNaiveForm<T extends Record<string, any>>(
  vcNaiveFormProps?: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>,
  initialModel: T = {} as T
) {
  const formExpose = ref<VcNaiveFormExpose | null>(null)
  const modelRef = ref<T>(initialModel)

  function register(expose: VcNaiveFormExpose) {
    formExpose.value = expose
  }

  const scope = effectScope()

  scope.run(() => {
    watchEffect(() => {
      if (vcNaiveFormProps) {
        formExpose?.value?.methods.updNaiveFormProps(vcNaiveFormProps)
      }
      modelRef.value = unref(formExpose)?.modelRef
    })
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    modelRef,
    methods: {
      ...unref(formExpose),
      register
    }
  }
}
