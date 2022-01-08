import TestA from "@/vc-navie/components/TestA/TestA.vue";
import type { App, Plugin } from 'vue'

TestA.install = function (app: App) {
  app.component(TestA.name, TestA);
  return app;
};

export default TestA as typeof TestA & Plugin
