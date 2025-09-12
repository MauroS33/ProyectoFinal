module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Compila para la versión actual de Node.js
        },
      },
    ],
    '@babel/preset-typescript', // Si estás usando TypeScript
  ],
};