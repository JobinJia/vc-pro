<template>
  <section>
    <h1>{{ result.name }}</h1>

    <div class="card">
      <h3>Demo</h3>
      <VcNaiveVcNaiveFormDemo />
      <pre v-highlightjs v-show="showSourceCode"><code class="language-js">&lt;script setup lang="ts"&gt;
  import &#123; NaiveFormSchema &#125 from '@/vc-naive/components/VcNaiveForm/type'
  import &#123; useNaiveForm &#125 from '@/vc-naive/components/VcNaiveForm'

  const formSchemas: NaiveFormSchema[] = [
    &#123;
      field: 'input1',
      component: 'NInput',
      formItemProps: &#123;
        label: 'InputLabel',
        labelPlacement: 'left'
      &#125
    &#125
  ]

  const &#123;
    modelRef,
    methods: &#123; register &#125
  &#125 = useNaiveForm&lt;&#123;
    input1: string
  &#125&gt;(&#123;
    schemas: formSchemas
  &#125)
  function handleClick() &#123;
    modelRef.value.input1 = Math.random().toString(32).substr(4, 8)
  &#125

  function getData() &#123;
    console.log(modelRef.value)
  &#125

  const formSchemas2: NaiveFormSchema[] = [
    &#123;
      field: 'input2',
      component: 'NInput',
      formItemProps: &#123;
        label: 'InputLabel',
        labelPlacement: 'left'
      &#125
    &#125
  ]

  const &#123;
    modelRef: modelRef1,
    methods: &#123; register: register1 &#125
  &#125 = useNaiveForm&lt;&#123;
    input2: string
  &#125&gt;(&#123;
    schemas: formSchemas2
  &#125)
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;VcNaiveForm @register="register"&gt;&lt;/VcNaiveForm&gt;
    &lt;VcNaiveForm @register="register1"&gt;&lt;/VcNaiveForm&gt;
    &lt;button @click="handleClick"&gt;Click&lt;/button&gt;
    &lt;button @click="getData"&gt;Click2&lt;/button&gt;

    &lt;button @click="modelRef1.input2 = Math.random().toString(32)"&gt;FORM2&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

</code></pre>
      <div class="source-code">
        <p style="text-align: center">
            <span style="cursor: pointer" @click="showSourceCode=!showSourceCode">
                {{showSourceCode ? '收起' : '展开'}}代码
            </span>
        </p>
      </div>
   </div>

    <template v-for="type in types" :key="type">
      <div class="card" v-if="result[type]">
        <h3>{{ result[type].h3 }}</h3>
        <table>
          <thead>
            <tr>
              <th
                v-for="(item, index) in result[type].table.headers"
                :key="index"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in result[type].table.rows" :key="i">
              <td v-for="(v, k) in item" :key="k">
                <!-- 类型 -->
                <em v-if="type === 'props' && k === 2">{{ v }}</em>
                <!-- 必填 -->
                <code v-else-if="type === 'props' && k === 4">{{ v }}</code>
                <span v-else>{{ v }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      types: ["props", "emits", "slots", "methods"],
      showDemo: false,
      showSourceCode: false,
      result: {"name":""}
    };
  },
};
</script>
