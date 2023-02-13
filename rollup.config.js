import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

export default {
  input: ['src/index.tsx'],
  output: [
    {
      format: 'esm',
      file: pkg.module,
      sourcemap: false
    },
    {
      format: 'cjs',
      file: pkg.main,
      sourcemap: false,
      esModule: false
    },
    {
      name: pkg['umd:name'] || pkg.name,
      format: 'umd',
      file: pkg.unpkg,
      sourcemap: false,
      esModule: false,
      plugins: [terser()]
    }
  ],
  external: [
    ...require('module').builtinModules,
    'react/jsx-runtime',
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    resolve({ modulesOnly: true }),
    replace(),
    terser(),
    typescript({
      useTsconfigDeclarationDir: true,
      rollupCommonJSResolveHack: true,
      exclude: 'node_modules'
    })
  ]
};
