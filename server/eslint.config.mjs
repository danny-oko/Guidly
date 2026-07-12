import nextEslintPluginNext from '@next/eslint-plugin-next';

export default [
  { plugins: { '@next/next': nextEslintPluginNext } },
  {
    ignores: ['.next/**/*', 'dist/**/*', 'node_modules/**/*'],
  },
];
