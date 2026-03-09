import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { copyFileSync } from 'fs'

export default defineConfig({
  plugins: [
    dts({ rollupTypes: true }),
    {
      name: 'copy-css',
      closeBundle() {
        copyFileSync('src/whiteboard.css', 'dist/whiteboard.css')
      },
    },
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'zustand'],
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      },
    },
  },
})
