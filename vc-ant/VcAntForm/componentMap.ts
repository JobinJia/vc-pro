import {
  AutoComplete,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  RadioGroup,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  Tree,
  TreeSelect
} from 'ant-design-vue'

export type ComponentMap = Map<string, unknown>

const map: ComponentMap = new Map()

map.set('AInput', Input)
map.set('AInputNumber', InputNumber)
map.set('ATreeSelect', TreeSelect)
map.set('ASelect', Select)
map.set('ACheckbox', Checkbox)
map.set('ARadio', Radio)
map.set('ARadioGroup', RadioGroup)
map.set('ASwitch', Switch)
map.set('ADatePicker', DatePicker)
map.set('ATimePicker', TimePicker)
map.set('ARate', Rate)
map.set('ATransfer', Transfer)
map.set('ATree', Tree)
map.set('ASlider', Slider)
map.set('AMentions', Mentions)
map.set('AAutoComplete', AutoComplete)

export { map as componentMap }
