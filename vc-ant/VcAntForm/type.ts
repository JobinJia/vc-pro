import type {
  FormProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
  TreeSelectProps,
  InputNumberProps,
  DatePickerProps,
  TimePickerProps,
  TimeRangePickerProps,
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
  AInput: InputProps
  AInputNumber: InputNumberProps
  ASelect: SelectProps
  ACheckbox: CheckboxProps
  ASwitch: SwitchProps
  ATreeSelect: TreeSelectProps
  ADatePicker: DatePickerProps
  ATimePicker: TimePickerProps
  ATimeRange: TimeRangePickerProps
  ARate: RateProps
  ATransfer: TransferProps
  ATree: TreeProps
  ASlider: SliderProps
  ARadio: RadioProps
  ARadioGroup: RadioGroupProps
  AMentions: MentionsProps
  ACascader: CascaderProps
  AAutoComplete: AutoCompleteProps
  Slots: VNode
}

export type VcAntFormComponentName = keyof VcAntComponentMap

export interface AntFormSchema<Name extends VcAntFormComponentName> {
  field: string
  component?: Name
  formItemProps?: FormItemProps & { [key: string]: any }
  componentProps?: VcAntComponentMap[Name]
  componentSlots?: (() => Slots | HTMLElement) | Slots
}
