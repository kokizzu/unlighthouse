import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  entries: [
    { input: 'src/index' },
  ],
  externals: [
    'listhen',
    'crossws',
    '@unrouted/core',
    'h3',
  ],
})
