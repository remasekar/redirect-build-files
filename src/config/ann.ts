import * as path from 'path'

const _ = path.sep

export default {
  deploy: 'grunt deploy-ann',

  prebuild: 'grunt prebuild --target=ann-dev',

  war: 'grunt war-ann',

  'ann.war': `[repoBase]${_}backend${_}annpl.war`,

  'webassets.war': `[repoBase]${_}backend${_}webassets.war`,

  'context-dev': {
    path: `[repoBase]${_}grunt-config${_}ctx${_}context-dev-ann.json`,
    replace: [
      {
        from: 'stage2.r.anntaylor.com',
        to: 'stage.r.anntaylor.com'
      },
      {
        from: 'stage.r.anntaylor.com',
        to: 'stage.r.anntaylor.com'
      }
    ]
  },

  config_ord: {
    path: `[repoBase]${_}backend${_}webassets.war${_}annpl${_}js${_}config_ord.js`,
    replace: [
      {
        from: 'defaultEnvironment:location.host',
        to: "defaultEnvironment:'stage.r.anntaylor.com'"
      }
    ]
  },

  app_ord: {
    path: `[repoBase]${_}backend${_}webassets.war${_}annpl${_}js${_}app_ord.js`,
    replace: [
      {
        from: '.jsp"',
        to: '.jsp?BYPASS=true"'
      }
    ]
  },

  metas: {
    path: `[repoBase]${_}backend${_}annpl.war${_}pl${_}common${_}metas.jsp`,

    replace: [
      {
        // tslint:disable-next-line: no-invalid-template-strings
        from: 'https://${pageContext.request.serverName}',
        // tslint:disable-next-line: no-http-string
        to: 'http://127.0.0.1:8080'
      }
    ]
  }
}
