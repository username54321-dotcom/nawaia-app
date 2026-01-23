module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: [
      'babel-plugin-react-compiler',
      // IMPORTANT: The Reanimated plugin must be the last plugin in the list.
      'react-native-reanimated/plugin',
    ],
  };
};
