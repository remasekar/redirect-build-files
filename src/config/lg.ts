import * as path from 'path'

const _ = path.sep;

export default {
    deploy: "grunt deploy-lg",

    prebuild: "grunt prebuild --target=lg-dev",

    war: "grunt war-lg",

    "lg.war": "[repoBase]${_}backend${_}lgpl.war",

    "webassets.war": "[repoBase]${_}backend${_}webassets.war",

    "context-dev": {
        path: `[repoBase]${_}grunt-config${_}ctx${_}context-dev-lg.json`,

        replace: [
            {
                from: "stage2.louandgrey.com",
                to: "stage.r.louandgrey.com"
            },
            {
                from: "stage.louandgrey.com",
                to: "stage.r.louandgrey.com"
            }
        ]
    },

    config_ord: {
        path: `[repoBase]${_}backend${_}webassets.war${_}lg${_}js${_}config_ord.js`,

        replace: [
            {
                from: "defaultEnvironment:location.host",
                to: "defaultEnvironment:'stage.r.louandgrey.com'"
            }
        ]
    },

    app_ord: {
        path: `[repoBase]${_}backend${_}webassets.war${_}lg${_}js${_}app_ord.js`,

        replace: [
            {
                from: '.jsp"',
                to: '.jsp?BYPASS=true"'
            }
        ]
    },

    metas: {
        path: `[repoBase]${_}backend${_}lgpl.war${_}pl${_}common${_}metas.jsp`,

        replace: [
            {
                from: "https://${pageContext.request.serverName}",
                to: "http://127.0.0.1:8080"
            }
        ]
    }
}