<script setup lang="ts">
  import { NaiveFormSchema } from '@/vc-naive/components/VcNaiveForm/type'
  import { useNaiveForm } from '@/vc-naive/components/VcNaiveForm'
  import { ref } from 'vue'
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
