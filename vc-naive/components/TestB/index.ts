import TestB from "@/vc-naive/components/TestB/TestB.vue";
import type { App, Plugin } from 'vue'

TestB.install = function (app: App) {
  app.component(TestB.name, TestB);
  return app;
};

export default TestB as typeof TestB & Plugin
