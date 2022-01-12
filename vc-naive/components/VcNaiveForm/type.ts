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

export type NotNull<T> = T extends null | undefined ? never : T

export interface VcNaiveFormComponentMap {
  NInput: InputProps | NotNull<Record<string, any>>
  NSelect: SelectProps | Record<string, any>
  NRadio: RadioProps | Record<string, any>
  NColorPicker: ColorPickerProps | Record<string, any>
  NCheckbox: CheckboxProps | Record<string, any>
  NDatePicker: DatePickerProps | Record<string, any>
  Slot: () => Slots
}

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

export type VcNaiveFormComponentName = keyof VcNaiveFormComponentMap

export interface NaiveFormSchema<Name extends VcNaiveFormComponentName> {
  field: string
  component?: VcNaiveFormComponentName
  componentProps?: Record<string, any> | VcNaiveFormComponentMap[Name]
  // componentProps?: { [key: string]: any }
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: NaiveGridFormItemProps & Record<string, any>
}

export function defineSchema<T extends VcNaiveFormComponentName>(schema: NaiveFormSchema<T>) {
  return schema
}

export type NaiveFormSchemas = typeof defineSchema[]

export interface VcNaiveFormProps extends FormProps {
  model?: Record<string, any>
  schemas?: NaiveFormSchemas
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
