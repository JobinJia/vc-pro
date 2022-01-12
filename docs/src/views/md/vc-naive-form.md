---
title: NaiveForm
meta:
  - name: description
    content: Hello World
test: test
---

# VcNaiveForm

> 使用 hook useNaiveForm 时，当传递的参数为普通的非响应式对象时, 则更新属性需要手动调用返回的 methods 中的方法。如

```vue
const options = {} const { modelRef, methods } = useNaiveForm(options) function updLabelWith() {
methods.updNaiveFormProps({ labelWidth: 200 }) }
```

<script setup lang="ts">
  import VcDocNaiveForm from '../use-naive-form/index.vue'
</script>

<VcDocNaiveForm>
</VcDocNaiveForm>
