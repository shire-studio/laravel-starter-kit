import { fileURLToPath } from 'url'
import { wayfinder } from '@laravel/vite-plugin-wayfinder'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import { bunny } from 'laravel-vite-plugin/fonts'
import RekaResolver from 'reka-ui/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { watch } from 'vite-plugin-watch'
import { defineConfig } from 'vite-plus'

const inertiaComponents = ['Link', 'Form', 'Head', 'Page', 'Deferred']

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    htmlWhitespaceSensitivity: 'css',
    printWidth: 80,
    sortTailwindcss: {
      stylesheet: 'resources/css/app.css',
    },
    tabWidth: 2,
    sortPackageJson: false,
    sortImports: {
      newlinesBetween: false,
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    },
    ignorePatterns: [
      'resources/js/components/ui/*',
      'resources/js/types/generated.d.ts',
      'resources/views/mail/*',
      'resources/js/actions/*',
      'resources/js/routes/*',
      'resources/js/wayfinder/*',
      'resources/js/types/home/runner/*',
      'resources/js/types/typescript-transformer-manifest.json',
    ],
  },
  lint: {
    plugins: ['eslint', 'vue', 'typescript', 'unicorn', 'oxc'],
    categories: {
      correctness: 'warn',
    },
    ignorePatterns: [
      'vendor',
      'node_modules',
      'public',
      'bootstrap/ssr',
      'tailwind.config.ts',
      'vite.config.ts',
      'resources/js/actions',
      'resources/js/routes',
      'resources/js/wayfinder',
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
    },
  },
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      ssr: 'resources/js/ssr.ts',
      refresh: true,
      fonts: [
        bunny('Instrument Sans', {
          weights: [400, 500, 600],
        }),
      ],
    }),
    tailwindcss(),
    wayfinder({
      formVariants: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    AutoImport({
      dtsMode: 'overwrite',
      imports: [
        'vue',
        {
          '@inertiajs/vue3': [
            'useForm',
            'usePage',
            'useRemember',
            'usePrefetch',
            'router',
          ],
          'reka-ui': [
            'createContext',
            'useForwardProps',
            'useForwardPropsEmits',
          ],
          vue: ['createSSRApp'],
        },
      ],
      dirs: ['resources/js/composables'],
    }),
    Components({
      dts: true,
      dirs: ['resources/js/components', 'resources/js/layouts'],
      // Sonner is resolved as UiToaster below, matching the React and Svelte kits.
      globsExclude: ['resources/js/components/ui/sonner/Sonner.vue'],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      types: [
        {
          names: inertiaComponents,
          from: '@inertiajs/vue3',
        },
      ],
      resolvers: [
        RekaResolver({
          prefix: 'Reka',
        }),
        (component: string) => {
          if (inertiaComponents.includes(component)) {
            return {
              name: component,
              from: '@inertiajs/vue3',
            }
          }

          if (component === 'UiToaster') {
            return {
              name: 'Toaster',
              from: '@/components/ui/sonner',
            }
          }

          return undefined
        },
      ],
    }),
    watch({
      pattern: 'app/{Data,Enums}/**/*.php',
      command: 'composer run transform-types',
    }),
  ],
  server: {
    watch: {
      ignored: [
        '**/.agents/**',
        '**/.ai/**',
        '**/.claude/**',
        '**/.codex/**',
        '**/.cursor/**',
        '**/.junie/**',
        '**/vendor/**',
      ],
    },
  },
})
