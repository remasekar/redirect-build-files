annic-cli
=========

Utility helps to make local build easier for full price sites

<!-- toc -->
* [Commands](#commands)
* [Edit config file](#edit-config-file)
<!-- tocstop -->

# Commands
<!-- commands -->
* [`annic-cli build`](#annic-cli-build)
* [`annic-cli config`](#annic-cli-config)
* [`annic-cli help [COMMAND]`](#annic-cli-help-command)
* [`annic-cli undo`](#annic-cli-undo)

## `annic-cli build`

Trigers the build process to create the local setup to run the code locally in jboss.

```
USAGE
  $ annic-cli build

OPTIONS
  -b, --brand=brand  brand to build
  -h, --help         show CLI help

EXAMPLE
  $ annic build <brand name here> (default brand set to lg)
```

_See code: [src/commands/build.ts](https://github.com/Cli/annic-cli/blob/v1.0.0/src/commands/build.ts)_

## `annic-cli config`

opens the config file in configured editor

```
USAGE
  $ annic-cli config

OPTIONS
  -b, --brand=brand  brand to build
  -h, --help         show CLI help

EXAMPLE
  $ annic config <brand name here> (if no brand is given then it will open the base config file)
```

_See code: [src/commands/config.ts](https://github.com/Cli/annic-cli/blob/v1.0.0/src/commands/config.ts)_

## `annic-cli help [COMMAND]`

display help for annic-cli

```
USAGE
  $ annic-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `annic-cli undo`

It discards all the changes done in the current repository

```
USAGE
  $ annic-cli undo

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ annic undo
```

_See code: [src/commands/undo.ts](https://github.com/Cli/annic-cli/blob/v1.0.0/src/commands/undo.ts)_
<!-- commandsstop -->

# Edit config file
<!-- editconfigfile -->

We need to set an application configured as default application to open .js/.ts (javascript/typescript) files to the make the `annic-cli config` command work.

Once set (e.g. if we set vscode) then it will open the necessary config file in the editor. Do the changes in the

```
replace: [
            {
                from: "defaultEnvironment:location.host",
                to: "defaultEnvironment:'stage.r.anntaylor.com'"
            }
        ]
```

in the `context-dev`, `config_ord`, `config_ord` files to point to the correct environment.

<!-- editconfigfilestop -->
# redirect-build-files
# redirect-build-files
