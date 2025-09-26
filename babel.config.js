module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      // This plugin is for worklets, which libraries like Reanimated depend on.
      'react-native-worklets/plugin',

      // IMPORTANT: The Reanimated plugin must be the last plugin in the list.
      'react-native-reanimated/plugin',
    ],
  };
};
