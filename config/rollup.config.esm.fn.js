import config from './rollup.config.esm';

// ES output
config.output.format = 'es';
config.output.file = 'dist/fn/index.esm.js';

export default config;
