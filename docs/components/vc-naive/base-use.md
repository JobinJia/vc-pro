<script setup>
import VcBasicNaiveFormDemo from '~/sfc/vc-naive/BasicNaiveFormDemo.vue';
import VcNaiveFormDemo from '~/sfc/vc-naive/VcNaiveFormDemo.vue';
import VcNaiveFormRefDemo from '~/sfc/vc-naive/VcNaiveFormRefDemo.vue';
</script>

# 组件

### 基础使用

<VcBasicNaiveFormDemo/>

::: details
```vue
<script setup lang="tsx">
  import { defineSchema, VcNaiveFormSchemas } from '@/vc-naive/components/VcNaiveForm'
  import { NRadio } from 'naive-ui'

  const radioOptions = [
    {
      value: "Rock'n'Roll Star",
      label: "Rock'n'Roll Star"
    },
    {
      value: 'Shakermaker',
      label: 'Shakermaker'
    }
  ]

  const schemas: VcNaiveFormSchemas = [
    defineSchema({
      field: 'inputVal',
      component: 'NInput',
      formItemProps: {
        label: '啊Label1'
      }
    }),
    defineSchema({
      field: 'radioVal',
      component: 'NRadioGroup',
      formItemProps: {
        label: '啊Label2'
      },
      componentSlots: {
        default: () => {
          return radioOptions.map((radio) => {
            return (
              <NRadio key={radio.value} value={radio.value}>
                {radio.label}
              </NRadio>
            )
          })
        }
      }
    })
  ]
</script>

<template>
  <VcNaiveForm :schemas="schemas" />
</template>

<style scoped lang="less"></style>

```
:::

::: tip

useNaiveForm(options)

:::

```ts
import { VcNaiveFormExpose } from "@vc-view/vc-naive/components/VcNaiveForm";

declare function useNaiveForm<T extends { [key: string]: any }>(
  options: useNaiveForm<Ref<vcNaiveProps> | vcNaiveProps>,
  initialData: T
): {
  modelRef: Ref<T>,
  methods: {
    register: (expose: VcNaiveFormExpose) => void,
  } & VcNaiveFormExpose['methods']
}
```

### Demo1
> 参数为 普通 对象(更新组件属性，需要手动调用返回的methods中的方法)
> 在大型Form表单中，使用可以提升性能

<VcNaiveFormDemo />
::: details
```vue
<script setup lang="ts">
  import { NaiveFormSchema } from '@/vc-naive/components/VcNaiveForm/type';
  import { useNaiveForm } from '@/vc-naive/components/VcNaiveForm';
  import { ref } from 'vue';
  import {
    NCard,
    NSpace,
    NSwitch,
    NButton,
    NDivider,
    NInputGroup,
    NInputGroupLabel,
    NInputNumber,
    NAlert
  } from 'naive-ui';
  const rPasswordFormItemRef = ref<any>({});
  const schemas: NaiveFormSchema[] = [
    {
      field: 'input',
      component: 'NInput',
      formItemProps: {
        label: 'NInput'
      }
    },
    {
      field: 'age',
      component: 'NInput',
      formItemProps: {
        label: '年龄'
      }
    },
    {
      field: 'password',
      component: 'NInput',
      formItemProps: {
        label: '密码'
      },
      componentProps: {
        'on-input': handlePasswordInput,
        type: 'password'
      }
    },
    {
      field: 'reenteredPassword',
      component: 'NInput',
      formItemProps: {
        label: '重复密码',
        first: true,
        ref: (el) => {
          el && (rPasswordFormItemRef.value = el)
        }
      },
      componentProps: {
        type: 'password',
        disabled: (values) => {
          return !values.password
        }
      }
    },
    {
      field: 'select',
      component: 'NSelect',
      formItemProps: {
        label: 'Select'
      },
      componentProps: {
        options: [
          {
            label: 'Drive My Car',
            value: 'song1'
          },
          {
            label: 'Norwegian Wood',
            value: 'song2'
          },
          {
            label: "You Won't See",
            value: 'song3'
          },
          {
            label: 'Nowhere Man',
            value: 'song4'
          },
          {
            label: 'Think For Yourself',
            value: 'song5'
          },
          {
            label: 'The Word',
            value: 'song6'
          },
          {
            label: 'Michelle',
            value: 'song7'
          },
          {
            label: 'What goes on',
            value: 'song8'
          },
          {
            label: 'Girl',
            value: 'song9'
          },
          {
            label: "I'm looking through you",
            value: 'song10'
          },
          {
            label: 'In My Life',
            value: 'song11'
          },
          {
            label: 'Wait',
            value: 'song12'
          }
        ]
      }
    },
    {
      field: 'dateTime',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DateTime'
      },
      componentProps: {
        type: 'datetime',
        style: {
          width: '100%'
        }
      }
    },
    {
      field: 'dateTimeRange',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DTRange'
      },
      componentProps: {
        type: 'datetimerange',
        style: {
          width: '100%'
        }
      }
    }
  ]
  const { modelRef, methods } = useNaiveForm(
    {
      labelWidth: 80,
      labelPlacement: 'left',
      schemas,
      gridProps: {
        cols: 1
      },
      rules: {
        age: [
          {
            required: true,
            validator(rule, value) {
              if (!value) {
                return new Error('需要年龄')
              } else if (!/^\d*$/.test(value)) {
                return new Error('年龄应该为整数')
              } else if (Number(value) < 18) {
                return new Error('年龄应该超过十八岁')
              }
              return true
            },
            trigger: ['input', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ],
        reenteredPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
          },
          {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
            trigger: ['blur', 'password-input']
          }
        ]
      }
    },
    {
      age: null
    }
  )
  function reset() {
    methods.resetNaiveForm()
  }
  function validatePasswordStartWith(rule, value) {
    return (
      modelRef.value.password &&
      modelRef.value.password.startsWith(value) &&
      modelRef.value.password.length >= value.length
    )
  }
  function validatePasswordSame(rule, value) {
    return value === modelRef.value.password
  }
  function handlePasswordInput() {
    if (modelRef.value.reenteredPassword) {
      rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
    }
  }
  function getFormModel() {
    console.info(JSON.stringify(modelRef.value))
  }
  function updFormValue() {
    modelRef.value.input = Math.random().toString(32).substr(5, 12)
  }
  function handleValidateButtonClick(e) {
    e.preventDefault()
    methods.validate((errors) => {
      if (!errors) {
        console.info('验证成功')
      } else {
        console.log(errors)
        console.info('验证失败')
      }
    })
  }
  // dynamic label width
  const labelWidthRef = ref<number>(80)
  function toggleLabelWidth(val) {
    if (!val) return
    labelWidthRef.value = val
    methods.updNaiveFormProps({
      labelWidth: val
    })
  }
  // col
  const colRef = ref<number>(1)
  function toggleCol(col) {
    if (!col) return
    colRef.value = col
    methods.updNaiveFormProps({
      gridProps: {
        cols: col
      }
    })
  }
  // disable form
  function disableForm(val: boolean) {
    methods.updNaiveFormProps({
      disabled: !val
    })
  }
  // label placement
  function labelAlign(val: boolean) {
    // useFormRef.value.labelAlign = val ? 'left' : 'right'
    methods.updNaiveFormProps({
      labelAlign: val ? 'left' : 'right'
    })
  }
  function getData() {
    console.log(modelRef.value)
  }
</script>

<template>
  <div>
    <NCard>
      <NSpace align="center">
        <n-switch size="large" :on-update:value="disableForm" :default-value="true">
          <template #checked>启用表单</template>
          <template #unchecked>禁用表单</template>
        </n-switch>
        <n-switch size="large" :on-update:value="labelAlign" :default-value="false">
          <template #checked>label居左</template>
          <template #unchecked>label居右</template>
        </n-switch>
        <n-input-group>
          <n-input-group-label>labelWidth:</n-input-group-label>
          <n-input-number
            v-model:value="labelWidthRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleLabelWidth"
            placeholder="最小值"
            :min="80"
            :max="150"
          />
        </n-input-group>
        <n-input-group>
          <n-input-group-label>一行</n-input-group-label>
          <n-input-number
            v-model:value="colRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleCol"
            placeholder="最小值"
            :min="1"
            :max="12"
          />
          <n-input-group-label>列</n-input-group-label>
        </n-input-group>
      </NSpace>
      <NDivider />
      <VcNaiveForm @register="methods.register" />
      <NSpace>
        <NButton type="primary" @click="getFormModel"> 获取model </NButton>
        <NButton type="primary" @click="updFormValue"> 改变值 </NButton>
        <NButton type="primary" @click="reset"> 重置 </NButton>
        <NButton
          type="warning"
          :disabled="modelRef.age === null"
          round
          @click="handleValidateButtonClick"
        >
          验证
        </NButton>
      </NSpace>
    </NCard>
  </div>
</template>
```
:::


### Demo1
> 参数为 响应式 对象
> 操作方便，初始化时创建响应式引用，只需要改变参数的值就会触发组件更新

<VcNaiveFormRefDemo />

::: details
```vue
<script setup lang="ts">
  import { NaiveFormSchema, VcNaiveFormProps } from '@/vc-naive/components/VcNaiveForm/type'
  import { useNaiveForm } from '@/vc-naive/components/VcNaiveForm'
  import { ref, unref } from 'vue'
  import {
    NButton,
    NCard,
    NSpace,
    NSwitch,
    NInputGroup,
    NInputGroupLabel,
    NInputNumber,
    NDivider,
    useMessage
  } from 'naive-ui'
  const rPasswordFormItemRef = ref<any>({})
  const schemas: NaiveFormSchema[] = [
    {
      field: 'input',
      component: 'NInput',
      formItemProps: {
        label: 'NInput'
      }
    },
    {
      field: 'age',
      component: 'NInput',
      formItemProps: {
        label: '年龄'
      }
    },
    {
      field: 'password',
      component: 'NInput',
      formItemProps: {
        label: '密码'
      },
      componentProps: {
        'on-input': handlePasswordInput,
        type: 'password'
      }
    },
    {
      field: 'reenteredPassword',
      component: 'NInput',
      formItemProps: {
        label: '重复密码',
        first: true,
        ref: (el) => {
          el && (rPasswordFormItemRef.value = el)
        }
      },
      componentProps: {
        type: 'password',
        disabled: (values) => {
          return !values.password
        }
      }
    },
    {
      field: 'select',
      component: 'NSelect',
      formItemProps: {
        label: 'Select'
      },
      componentProps: {
        options: [
          {
            label: 'Drive My Car',
            value: 'song1'
          },
          {
            label: 'Norwegian Wood',
            value: 'song2'
          },
          {
            label: "You Won't See",
            value: 'song3'
          },
          {
            label: 'Nowhere Man',
            value: 'song4'
          },
          {
            label: 'Think For Yourself',
            value: 'song5'
          },
          {
            label: 'The Word',
            value: 'song6'
          },
          {
            label: 'Michelle',
            value: 'song7'
          },
          {
            label: 'What goes on',
            value: 'song8'
          },
          {
            label: 'Girl',
            value: 'song9'
          },
          {
            label: "I'm looking through you",
            value: 'song10'
          },
          {
            label: 'In My Life',
            value: 'song11'
          },
          {
            label: 'Wait',
            value: 'song12'
          }
        ]
      }
    },
    {
      field: 'dateTime',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DateTime'
      },
      componentProps: {
        type: 'datetime',
        style: {
          width: '100%'
        }
      }
    },
    {
      field: 'dateTimeRange',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DTRange'
      },
      componentProps: {
        type: 'datetimerange',
        style: {
          width: '100%'
        }
      }
    }
  ]
  const useFormRef = ref<VcNaiveFormProps>({
    labelWidth: 80,
    labelPlacement: 'left',
    schemas,
    gridProps: {
      cols: 1
    },
    rules: {
      age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('需要年龄')
            } else if (!/^\d*$/.test(value)) {
              return new Error('年龄应该为整数')
            } else if (Number(value) < 18) {
              return new Error('年龄应该超过十八岁')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
      ]
    }
  })
  const {
    modelRef,
    methods: { register: registerForm, validate, resetNaiveForm }
  } = useNaiveForm(useFormRef, {
    age: null
  })
  function reset() {
    resetNaiveForm()
  }
  function validatePasswordStartWith(rule, value) {
    return (
      modelRef.value.password &&
      modelRef.value.password.startsWith(value) &&
      modelRef.value.password.length >= value.length
    )
  }
  function validatePasswordSame(rule, value) {
    return value === modelRef.value.password
  }
  function handlePasswordInput() {
    if (modelRef.value.reenteredPassword) {
      rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
    }
  }

  const message = useMessage()
  function getFormModel() {
    message.info(JSON.stringify(unref(modelRef)))
  }
  function updFormValue() {
    modelRef.value.input = Math.random().toString(32).substr(5, 12)
  }
  function handleValidateButtonClick(e) {
    e.preventDefault()
    validate((errors) => {
      if (!errors) {
        console.info('验证成功')
      } else {
        console.log(errors)
        console.info('验证失败')
      }
    })
  }
  // dynamic label width
  const labelWidthRef = ref<number>(80)
  function toggleLabelWidth(val: number) {
    labelWidthRef.value = val
    useFormRef.value.labelWidth = val
  }
  // col
  const colRef = ref<number>(1)
  function toggleCol(col: number) {
    if (!col) return
    colRef.value = col
    useFormRef.value.gridProps.cols = col
  }
  // disable form
  function disableForm(val: boolean) {
    useFormRef.value.disabled = !val
  }
  // label placement
  function labelAlign(val: boolean) {
    useFormRef.value.labelAlign = val ? 'left' : 'right'
  }
</script>

<template>
  <div>
    <NCard>
      <NSpace align="center">
        <n-switch size="large" :on-update:value="disableForm" :default-value="true">
          <template #checked>启用表单</template>
          <template #unchecked>禁用表单</template>
        </n-switch>
        <n-switch size="large" :on-update:value="labelAlign" :default-value="false">
          <template #checked>label居左</template>
          <template #unchecked>label居右</template>
        </n-switch>
        <n-input-group>
          <n-input-group-label>labelWidth:</n-input-group-label>
          <n-input-number
            v-model:value="labelWidthRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleLabelWidth"
            placeholder="最小值"
            :min="80"
            :max="150"
          />
        </n-input-group>
        <n-input-group>
          <n-input-group-label>一行</n-input-group-label>
          <n-input-number
            v-model:value="colRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleCol"
            placeholder="最小值"
            :min="1"
            :max="12"
          />
          <n-input-group-label>列</n-input-group-label>
        </n-input-group>
      </NSpace>
      <NDivider />
      <VcNaiveForm @register="registerForm" />
      <NSpace>
        <NButton type="primary" @click="getFormModel"> 获取model </NButton>
        <NButton type="primary" @click="updFormValue"> 改变值 </NButton>
        <NButton type="primary" @click="reset"> 重置 </NButton>
        <NButton
          type="warning"
          :disabled="modelRef.age === null"
          round
          @click="handleValidateButtonClick"
        >
          验证
        </NButton>
      </NSpace>
    </NCard>
  </div>
</template>

```
:::
