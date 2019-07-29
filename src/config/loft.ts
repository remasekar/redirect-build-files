import * as path from 'path'

const _ = path.sep;

export default {
    deploy: "grunt deploy-loft",

    prebuild: "grunt prebuild --target=loft-dev",

    war: "grunt war-loft",

    "loft.war": `[repoBase]${_}backend${_}loftpl.war`,

    "webassets.war": `[repoBase]${_}backend${_}webassets.war`,

    "context-dev": {
        path: `[repoBase]${_}grunt-config${_}ctx${_}context-dev-loft.json`,

        replace: [
            {
                from: "stage2.loft.com",
                to: "dev2.r.loft.com"
            },
            {
                from: "stage2.loft.com",
                to: "dev2.r.loft.com"
            }
        ]
    },

    config_ord: {
        path: `[repoBase]${_}backend${_}webassets.war${_}loftpl${_}js${_}config_ord.js`,

        replace: [
            {
                from: "defaultEnvironment:location.host",
                to: "defaultEnvironment:'dev2.r.loft.com'"
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
                from: "https://${pageContext.request.serverName}",
                to: "http://127.0.0.1:8080"
            }
        ]
    }
}