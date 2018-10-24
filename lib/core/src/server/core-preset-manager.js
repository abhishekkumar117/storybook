import loadCustomBabelConfig from './loadCustomBabelConfig';
import loadCustomAddons from './loadCustomAddonsFile';
import loadCustomConfig from './loadCustomConfigFile';
import createDevConfig from './config/webpack.config.manager';
import defaultBabelConfig from './config/babel.dev';
import { createManagerEntry, createPreviewEntry } from './config/entries';

export async function webpack(_, options) {
  return createDevConfig(options);
}

export async function babel(_, options) {
  const { configDir, presets } = options;

  return loadCustomBabelConfig(configDir, () =>
    presets.apply('babelDefault', defaultBabelConfig, options)
  );
}

export async function manager(_, options) {
  return createManagerEntry(options);
}

export async function preview(_, options) {
  return [
    ...(await createPreviewEntry(options)),
    `${require.resolve('webpack-hot-middleware/client')}?reload=true`,
  ];
}

export async function addons(_, options) {
  return loadCustomAddons(options);
}

export async function config(_, options) {
  return loadCustomConfig(options);
}
