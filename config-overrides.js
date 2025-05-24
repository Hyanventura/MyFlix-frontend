const { override, addWebpackPlugin } = require('customize-cra');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = override(
  addWebpackPlugin(
    new ForkTsCheckerWebpackPlugin({
      async: true, // mostra os erros no terminal, não bloqueia o navegador
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    })
  )
);