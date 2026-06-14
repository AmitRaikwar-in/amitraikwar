require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', {runtime: 'automatic'}], '@babel/preset-typescript'],
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});
const React = require('react');
const { renderToString } = require('react-dom/server');
const Orb = require('./src/components/Orb/Orb.tsx').default;
try {
  console.log(renderToString(React.createElement(Orb)));
} catch (e) {
  console.error(e);
}
