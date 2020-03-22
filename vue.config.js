module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'Clube de Benefícios - MV',
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~bootstrap/scss/bootstrap";',
      },
    },
  },
  pwa: {
    name: 'Clube de Benefícios - MV',
    manifestCrossorigin: 'use-credentials',
  },
};
