import type { FormProps, GridProps } from 'naive-ui'
import type { Ref } from 'vue'
import { Slots } from 'vue'

import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/lib/form/src/interface'

import type {
  FormItemProps,
  GridItemProps,
  InputProps,
  SelectProps,
  RadioProps,
  ColorPickerProps,
  CheckboxProps,
  DatePickerProps
} from 'naive-ui'

export interface VcNaiveRunTimeComponentType {
  NInput: InputProps
  NSelect: SelectProps
  NRadio: RadioProps
  NColorPicker: ColorPickerProps
  NCheckbox: CheckboxProps
  NDatePicker: DatePickerProps
  Slot: Slots
}

export type VcNaiveFormComponentName =
  | 'NInput'
  | 'NSelect'
  | 'NRadio'
  | 'NSwitch'
  | 'NColorPicker'
  | 'NCheckbox'
  | 'NDatePicker'
  | 'Slot'

// export type VcNaiveFormComponentName = keyof VcNaiveRunTimeComponentType

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

// export type VcNaiveComponentProps<T> = T extends VcNaiveFormComponentName
//   ? VcNaiveRunTimeComponentType[T]
//   : never
// export type VcNaiveComponentProps<T = VcNaiveRunTimeComponentType> = {
//   [P in keyof T]: P
// }

export interface NaiveFormSchema {
  field: string
  component?: VcNaiveFormComponentName
  // componentProps?: VcNaiveComponentProps<VcNaiveFormComponentName>
  componentProps?: { [key: string]: any }
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
