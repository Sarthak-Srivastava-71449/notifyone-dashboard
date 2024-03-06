// eslint-disable-next-line import/no-relative-packages
import commonConfig from '../../config.json';

// eslint-disable-next-line import/no-mutable-exports
let config: any;

if (commonConfig.server) {
  config = commonConfig.server;
}
export default config;
