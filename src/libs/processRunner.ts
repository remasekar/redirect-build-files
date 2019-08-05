// tslint:disable: file-name-casing
// tslint:disable: ordered-imports
// tslint:disable: no-console
import {exec} from 'child_process'
import chalk from 'chalk'

export function run(
  cmd: string,
  options: any,
  outputListener: any
): Promise<any> {
  console.log(chalk.yellow(`\n == INFO: run (${cmd}) started! ==\n`))
  return new Promise((resolve, reject) => {
    try {
      const ls = exec(cmd, options)
      ls.stdout.on('data', outputListener)
      // FIXME: Is this right? Or what to do ?? :(
      ls.stderr.on('data', outputListener)
      // tslint:disable-next-line: no-inferrable-types
      ls.on('exit', function (code: string = '') {
        console.log(chalk.yellow(`\n == INFO: run (${cmd}) finished! ==\n`))
        resolve('Child process exited with code ' + code.toString())
      })
    } catch (error) {
      reject(error)
    }
  })
}
