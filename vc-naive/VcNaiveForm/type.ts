import type { Ref } from 'vue'
import { Slots } from 'vue'

import { FormValidateCallback, ShouldRuleBeApplied } from 'naive-ui/lib/form/src/interface'

import type {
  FormItemProps,
  GridItemProps,
  InputProps,
  SelectProps,
  RadioProps,
  RadioGroupProps,
  ColorPickerProps,
  CheckboxProps,
  DatePickerProps,
  FormProps,
  GridProps
} from 'naive-ui'

export interface VcNaiveFormComponentMap {
  NInput: InputProps | Record<string, any>
  NSelect: SelectProps | Record<string, any>
  NRadio: RadioProps | Record<string, any>
  NColorPicker: ColorPickerProps | Record<string, any>
  NCheckbox: CheckboxProps | Record<string, any>
  NDatePicker: DatePickerProps | Record<string, any>
  NRadioGroup: RadioGroupProps | Record<string, any>
  Slot: () => Slots
}

export type NaiveGridFormItemProps = Partial<FormItemProps & GridItemProps>

export type VcNaiveFormComponentName = keyof VcNaiveFormComponentMap

export interface VcNaiveFormSchema<Name extends VcNaiveFormComponentName> {
  field: string
  component?: Name
  componentProps?: VcNaiveFormComponentMap[Name]
  componentSlots?: (() => Slots | HTMLElement) | Slots
  formItemProps?: NaiveGridFormItemProps & Record<string, any>
}

export function defineSchema<T extends VcNaiveFormComponentName>(schema: VcNaiveFormSchema<T>) {
  return schema
}

export type VcNaiveFormSchemas = VcNaiveFormSchema<VcNaiveFormComponentName>[]

export interface VcNaiveFormProps extends Omit<FormProps, 'model'> {
  model?: Record<string, any>
  schemas?: VcNaiveFormSchemas
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
