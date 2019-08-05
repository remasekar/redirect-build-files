// tslint:disable: ordered-imports
// tslint:disable: no-console
import {Command, flags} from '@oclif/command'
import {run} from '../libs/processRunner'
import {config} from '../config'

export default class Undo extends Command {
  static description =
    'It discards all the changes done in the current repository'

  static examples = ['$ annic undo']

  static flags = {
    help: flags.help({char: 'h'})
  }

  async run() {
    this.parse(Undo)
    //  To remove directories, run git clean -f -d or git clean -fd
    //  To remove ignored files, run git clean -f -X or git clean -fX
    //  To remove ignored and non-ignored files, run git clean -f -x or git clean -fx
    const options = {cwd: config.repoBase}
    await run('git clean -fd', options, function (data: any) {
      console.log(data)
    })
    await run('git reset --hard', options, function (data: any) {
      console.log(data)
    })
  }
}
