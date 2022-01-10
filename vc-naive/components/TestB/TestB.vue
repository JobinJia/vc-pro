<template>
  <div class="test-b">
    Test A Component
    <br />
    {{ size }}
    <br />
    {{ title }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import './style.less'

  export default defineComponent({
    name: 'TestB',
    props: {
      title: {
        type: String as PropType<string>
      },
      size: {
        type: String as PropType<'large' | 'medium' | 'small'>,
        default: 'small'
      }
    }
  })
</script>
