module.exports = [
  {
    script: 'dist/index.js',
    name: 'catculator',
    exec_mode: 'cluster',
    instances: 2,
  },
];
