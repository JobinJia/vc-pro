import { VcNaiveFormExpose, VcNaiveFormProps } from '@/vc-naive/components/VcNaiveForm/type'
import {computed, effectScope, onScopeDispose, ref, Ref, unref, watchEffect} from 'vue'
import {FormValidateCallback, ShouldRuleBeApplied} from "naive-ui/lib/form/src/interface";

export function useNaiveForm<T extends Record<string, any>>(
  vcNaiveFormProps?: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>,
  initialModel: T = {} as T
) {
  const formExpose = ref<VcNaiveFormExpose>({
    modelRef: ref({}),
    methods: {
      validate: () => Promise.resolve(),
      resetNaiveForm: () => {},
      updNaiveFormProps: () => {},
    }
  })
  const modelRef = ref<T>(initialModel)

  function register(expose: VcNaiveFormExpose) {
    formExpose.value = expose
  }

  const scope = effectScope()

  scope.run(() => {
    watchEffect(() => {
      if (vcNaiveFormProps) {
        formExpose.value.methods.updNaiveFormProps(vcNaiveFormProps)
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
      register,
      validate: async (validateCallback?: FormValidateCallback, shouldRuleBeApplied?: ShouldRuleBeApplied) => {
        return await unref(formExpose).methods.validate(validateCallback, shouldRuleBeApplied)
      },
      resetNaiveForm: () => {
        return unref(formExpose).methods.resetNaiveForm()
      }
    }
  }
}
