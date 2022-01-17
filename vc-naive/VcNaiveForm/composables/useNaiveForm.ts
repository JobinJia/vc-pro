import { VcNaiveFormExpose, VcNaiveFormProps } from '../type'
import { effectScope, isRef, onScopeDispose, ref, Ref, unref, watchEffect } from 'vue'
import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/lib/form/src/interface'

export function useNaiveForm<T extends Record<string, any>>(
  vcNaiveFormProps?: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>,
  initialModel: T = {} as T
) {
  const formExpose = ref<VcNaiveFormExpose>({
    modelRef: ref({}),
    methods: {
      validate: () => Promise.resolve(),
      updNaiveFormProps: () => {},
      resetNaiveForm: () => {}
    }
  })
  const modelRef = ref<T>(initialModel)

  function register(expose: VcNaiveFormExpose) {
    formExpose.value = expose
    // props not reactivity object
    if (vcNaiveFormProps && !isRef(vcNaiveFormProps)) {
      formExpose.value.methods.updNaiveFormProps(vcNaiveFormProps)
    }
  }

  const scope = effectScope()

  scope.run(() => {
    watchEffect(() => {
      // props is reactivity must be update props, if not, update with `return methods`
      if (vcNaiveFormProps && isRef(vcNaiveFormProps)) {
        formExpose.value.methods.updNaiveFormProps(vcNaiveFormProps)
      }
      modelRef.value = unref(formExpose).modelRef
    })
  })

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    modelRef,
    methods: {
      register,
      validate: async (
        validateCallback?: FormValidateCallback,
        shouldRuleBeApplied?: ShouldRuleBeApplied
      ) => {
        return await unref(formExpose).methods.validate(validateCallback, shouldRuleBeApplied)
      },
      resetNaiveForm: () => {
        return unref(formExpose).methods.resetNaiveForm()
      },
      updNaiveFormProps: (updProps: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>) => {
        return unref(formExpose).methods.updNaiveFormProps(updProps)
      }
    }
  }
}
