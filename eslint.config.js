// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import prettier from 'eslint-plugin-prettier'

export default defineConfig([
  // 💡 指定要检查的文件
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  // 💡 全局忽略文件夹
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  // 💡 浏览器全局变量
  {
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  // 💡 JavaScript 推荐规则
  js.configs.recommended,

  // 💡 Vue essential 规则
  ...pluginVue.configs['flat/essential'],

  // 💡 Prettier 跳过格式化处理
  skipFormatting,

  // 💡 自定义规则
  {
    plugins: {
      prettier
    },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true, // 单引号
          semi: false, // 无分号
          printWidth: 80, // 每行宽度至多80字符
          trailingComma: 'none', // 不加对象|数组最后逗号
          endOfLine: 'auto' // 换行符号不限制（win/mac 不一致）
        }
      ],
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index'] // 忽略 index.vue
        }
      ],
      'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构校验 (props解构丢失响应式)
      'no-undef': 'error' // 未定义变量报错
    },
    languageOptions: {
      globals: {
        ElMessage: 'readonly',
        ElMessageBox: 'readonly',
        ElLoading: 'readonly'
      }
    }
  }
])
