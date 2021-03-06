import * as path from 'path'

const _ = path.sep

export default {
  deploy: 'grunt deploy-loft',

  prebuild: 'grunt prebuild --target=loft-dev',

  war: 'grunt war-loft',

  'loft.war': `[repoBase]${_}backend${_}loftpl.war`,

  'webassets.war': `[repoBase]${_}backend${_}webassets.war`,

  'context-dev': {
    path: `[repoBase]${_}grunt-config${_}ctx${_}context-dev-loft.json`,

    replace: [
      {
        from: 'stage2.r.loft.com',
        to: 'breakfix.r.loft.com'
      },
      {
        from: 'stage.r.loft.com',
        to: 'breakfix.r.loft.com'
      }
    ]
  },

  config_ord: {
    path: `[repoBase]${_}backend${_}webassets.war${_}loftpl${_}js${_}config_ord.js`,

    replace: [
      {
        from: 'defaultEnvironment:location.host',
        to: "defaultEnvironment:'loft.r.com'"
      }
    ]
  },

  app_ord: {
    path: `[repoBase]${_}backend${_}webassets.war${_}loftpl${_}js${_}app_ord.js`,

    replace: [
      {
        from: '.jsp"',
        to: '.jsp?BYPASS=true"'
      }
    ]
  },

  metas: {
    path: `[repoBase]${_}backend${_}loftpl.war${_}pl${_}common${_}metas.jsp`,

    replace: [
      {
        // tslint:disable-next-line: no-invalid-template-strings
        from: 'https://${pageContext.request.serverName}',
        // tslint:disable-next-line: no-http-string
        to: 'http://loft.r.com:8080'
      }
    ]
  }
}
