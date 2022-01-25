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
  GridProps,
  AutoCompleteProps,
  CascaderProps,
  InputNumberProps,
  MentionProps,
  RateProps,
  SliderProps,
  SwitchProps,
  TimePickerProps,
  TransferProps,
  TreeSelectProps
} from 'naive-ui'

// todo add upload
export interface VcNaiveFormComponentMap {
  NInput: InputProps | Record<string, any>
  NSelect: SelectProps | Record<string, any>
  NRadio: RadioProps | Record<string, any>
  NColorPicker: ColorPickerProps | Record<string, any>
  NCheckbox: CheckboxProps | Record<string, any>
  NDatePicker: DatePickerProps | Record<string, any>
  NRadioGroup: RadioGroupProps | Record<string, any>
  NAutoComplete: AutoCompleteProps | Record<string, any>
  NCascader: CascaderProps | Record<string, any>
  NInputNumber: InputNumberProps | Record<string, any>
  NMention: MentionProps | Record<string, any>
  NRate: RateProps | Record<string, any>
  NSlider: SliderProps | Record<string, any>
  NSwitch: SwitchProps | Record<string, any>
  NTimePicker: TimePickerProps | Record<string, any>
  NTransfer: TransferProps | Record<string, any>
  NTreeSelect: TreeSelectProps | Record<string, any>
  Slot: () => Slots | (() => Slots)
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

export function defineSchema<T extends VcNaiveFormComponentName>(
  schema: VcNaiveFormSchema<T>
): VcNaiveFormSchema<T> {
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
