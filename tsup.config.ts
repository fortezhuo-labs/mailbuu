import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/server/index.ts',
  ],
  outDir: "dist/server",
  dts: false,
  clean: true,
  format: ['esm'],
  minify: true,
  splitting: true,
})
