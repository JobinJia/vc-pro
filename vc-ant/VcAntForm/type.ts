import {
  FormProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
  TreeSelectProps,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
  // TimeRangePickerProps,
  RateProps,
  TransferProps,
  TreeProps,
  SliderProps,
  RadioProps,
  RadioGroupProps,
  MentionsProps,
  CascaderProps,
  AutoCompleteProps,
  FormItemProps
} from 'ant-design-vue'
import { InputProps } from 'ant-design-vue/es/input/inputProps'
import { Slots, VNode } from 'vue'

// todo upload
export interface VcAntComponentMap {
  AInput: InputProps | Record<string, any>
  AInputNumber: InputNumberProps | Record<string, any>
  ASelect: SelectProps | Record<string, any>
  ACheckbox: CheckboxProps | Record<string, any>
  ASwitch: SwitchProps | Record<string, any>
  ATreeSelect: TreeSelectProps | Record<string, any>
  ADatePicker: DatePickerProps | Record<string, any>
  ATimePicker: TimePickerProps | Record<string, any>
  // ATimeRange: TimeRangePickerProps | Record<string, any>
  ARate: RateProps | Record<string, any>
  ATransfer: TransferProps | Record<string, any>
  ATree: TreeProps | Record<string, any>
  ASlider: SliderProps | Record<string, any>
  ARadio: RadioProps | Record<string, any>
  ARadioGroup: RadioGroupProps | Record<string, any>
  AMentions: MentionsProps | Record<string, any>
  ACascader: CascaderProps | Record<string, any>
  AAutoComplete: AutoCompleteProps | Record<string, any>
  Slots: VNode | (() => VNode)
}

export type VcAntFormComponentName = keyof VcAntComponentMap

export interface VcAntFormSchema<Name extends VcAntFormComponentName> {
  field: string
  component?: Name
  formItemProps?: FormItemProps | Record<string, any>
  componentProps?: VcAntComponentMap[Name]
  componentSlots?: (() => Slots | HTMLElement) | Slots
}

export function defineSchema<T extends VcAntFormComponentName>(
  schema: VcAntFormSchema<T>
): VcAntFormSchema<T> {
  return schema
}

export type VcAntFormSchemas = VcAntFormSchema<VcAntFormComponentName>[]

export interface VcAntFormProps extends Omit<FormProps, 'model'> {
  model?: Record<string, any>
  schemas?: VcAntFormSchemas
}
