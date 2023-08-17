import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue2'

function get__filename() {
  const error = new Error()
  const stack = error.stack
  const match = stack.match(/^Error\s+at[^\r\n]+\s+at *(?:[^\r\n(]+\((.+?)(?::\d+:\d+)?\)|(.+?)(?::\d+:\d+)?) *([\r\n]|$)/)
  const filename = match[1] || match[2]
  if (filename.startsWith('file://'))
    return fileURLToPath(filename)

  return filename
}

if (typeof __filename === 'undefined') {
  global.__filename = get__filename()
  const __filename = get__filename()
  global.__dirname = dirname(__filename)
  const __dirname = dirname(__filename)
}

export default defineConfig(({ mode }) => {
  const isProd = mode === 'prod'
  const isDev = mode === 'dev'
  const isTest = mode === 'test'

  let build = {}
  if (isProd) {
    build = {
      lib: {
        entry: {
          index: resolve(__dirname, 'src/index.ts'),
          blocks: resolve(__dirname, 'src/blocks.ts')
        },
        // entry: resolve(__dirname, 'src/index.ts'),
        name: 'edeet',
        // fileName: 'index',
        formats: ['es', 'cjs', ], //'umd'
      },
      rollupOptions: {
        /**
                 * DESC:
                 * make sure to externalize deps that shouldn't be bundled
                 * into your library
                 */
        external: [
          'vue',
          // 'vue-demi',
        ],
        output: {
          /**
                     * DESC:
                     * Provide global variables to use in the UMD build
                     * for externalized deps
                     */
          globals: {
            vue: 'Vue',
            // 'vue-demi': 'VueDemi',
          },
        },
      },
    }
  }

  let optimizeDeps = {}
  if (isDev) {
    /**
         * DESC:
         * dependency pre-bundling
         */
    optimizeDeps = {
      // exclude: ['vue-demi'],
    }
  }

  let test = {}
  if (isTest) {
    /**
         * DESC:
         * vitest config
         */
    test = {
      include: ['test/**/*.test.ts'],
      environment: 'happy-dom',
      deps: {
        inline: [
          '@vue',
          // 'vue-demi',
        ],
      },
      coverage: {
        reporter: [
          'text',
          'text-summary',
          'lcov',
        ],
      },
    }
  }

  return {
    plugins: [vue()],
    optimizeDeps,
    build,
    test,

    /**
         * DESC:
         * defining aliases
         */
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    //hassan https://stackoverflow.com/a/75633477/1323706
    define: {
      "process": {
        client: true,
      },
    },
  }
})
