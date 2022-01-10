<template>
  <div class="test-a">
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
    name: 'TestA',
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
