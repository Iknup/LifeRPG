/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['react-calendar']);

module.exports = withTM({
  reactStrictMode: true,
});
