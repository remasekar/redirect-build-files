// tslint:disable: ordered-imports
import * as path from 'path'
import * as open from 'open'
import * as fs from 'fs-extra'
import {Command, flags} from '@oclif/command'

const _ = path.sep

export default class Config extends Command {
  static description =
    'opens the config file in configured editor'

  static examples = ['$ annic config <brand name here> (if no brand is given then it will open the base config file)']

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-b, --brand=VALUE)
    brand: flags.string({char: 'b', description: 'brand to build'})
  }

  async run() {
    try {
      const {flags} = this.parse(Config)
      const brand = flags.brand
      let filePath = ''

      brand ? filePath = path.join(__dirname, `..${_}config${_}${brand}`) :
        filePath = path.join(__dirname, `..${_}config${_}base`)

      const file = `${filePath}.ts`

      // While packaging this becomes a problem since we
      // have only the js files in the bundle.
      if (fs.existsSync(file)) {
        await open(file)
      } else {
        await open(`${filePath}.js`)
      }

    } catch (error) {
      this.error(error)
    }
  }
}
