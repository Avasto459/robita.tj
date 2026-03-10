import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Register tsx as a loader
await import('tsx/esm');

// Now import and run the server
await import('./server.ts');
