import type { FormProps, GridProps } from 'naive-ui'
import type { Ref } from 'vue'
import { Slots } from 'vue'

export type VcNaiveFormComponentName =
  | 'NInput'
  | 'NSelect'
  | 'NRadio'
  | 'NSwitch'
  | 'NColorPicker'
  | 'NCheckbox'
  | 'NDatePicker'
  | 'Slot'

import type { FormItemProps, GridItemProps } from 'naive-ui'
import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/lib/form/src/interface'

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

export interface NaiveFormSchema {
  field: string
  component?: VcNaiveFormComponentName
  componentProps?: Record<string, any>
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: NaiveGridFormItemProps & Record<string, any>
}

export interface VcNaiveFormProps extends FormProps {
  model?: Record<string, any>
  schemas?: NaiveFormSchema[]
  gridProps?: Partial<GridProps>
}

export interface VcNaiveFormExpose {
  modelRef: Ref<Record<string, any>>
  methods: {
    updNaiveFormProps: (
      updProps: Ref<Partial<VcNaiveFormProps>> | Partial<VcNaiveFormProps>
    ) => void
    resetNaiveForm: () => void
    validate: (
      validateCallback?: FormValidateCallback,
      shouldRuleBeApplied?: ShouldRuleBeApplied
    ) => Promise<void>
  }
}

export interface VcNaiveFormEmit {
  (e: 'register', expose?: VcNaiveFormExpose): void
}
