import type { Config } from 'jest';

const config: Config = {
  // Configuración básica
  preset: 'ts-jest', // Usar ts-jest para procesar archivos TypeScript
  testEnvironment: 'node', // Entorno de prueba (Node.js)

  // Transformar archivos TypeScript
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transforma archivos .ts y .tsx
  },

  // Extensiones de archivos a considerar
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Cobertura de código
  clearMocks: true, // Limpiar mocks antes de cada prueba
  collectCoverage: true, // Habilitar la recolección de cobertura
  coverageDirectory: 'coverage', // Directorio donde se almacenará la cobertura

  // Opcional: Archivos o directorios a ignorar en la cobertura
  coveragePathIgnorePatterns: [
    '/node_modules/', // Ignorar node_modules
  ],

  // Patrones para detectar archivos de prueba
  testMatch: [
    '**/__tests__/**/*.?(m)[jt]s?(x)', // Archivos en carpetas __tests__
    '**/?(*.)+(spec|test).?(m)[jt]s?(x)', // Archivos con sufijo .spec.ts o .test.ts
  ],
};

export default config;