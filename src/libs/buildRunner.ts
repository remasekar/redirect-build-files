import * as fs from "fs-extra";
import chalk from "chalk";
import { config } from "../config";
import { run } from "./processRunner";

export default class BuildRunner {
  log = console.log;
  brandConfig: any;

  constructor(private brand: string) {
    this.brandConfig = (config as any)[this.brand];
    console.log(this.brand);
  }

  public async build() {
    try {
      await this.executeCommand("deploy");
      this.replaceContent("context-dev");
      await this.executeCommand("prebuild");
      this.replaceContent("config_ord");
      this.replaceContent("app_ord");
      this.replaceContent("metas", false);
      await this.executeCommand("war");
      this.moveBuildArtifactsToJboss();
      this.triggerDoDeploy();
    } catch (error) {
      this.log(
        chalk.red(`
              ============== ERROR ======================
               ${error}
              ============== ERROR ======================
            `)
      );
    }
  }

  private resolveFullPath(path: string) {
    return path.replace("[repoBase]", config.repoBase);
  }

  private async executeCommand(command: string) {
    const options = { cwd: config.repoBase, shell: true };
    const outputListener = (data: any) => {
      this.log(chalk.green(data.toString()));
    };
    const commandToRun = `${this.brandConfig[command]}`;
    this.log(
      chalk.green(`\n == INFO: executeCommand (${commandToRun}) started!. ==\n`)
    );
    const res = await run(commandToRun, options, outputListener);
    this.log(
      chalk.green(
        `\n == INFO: ${commandToRun} deploy command executed. \n RESULT: ${res} ==\n`
      )
    );
  }

  private replaceContent(key: string, regex: boolean = true) {
    this.log(chalk.green(`\n == INFO: replaceContent (${key}) started! ==\n`));
    const path = this.resolveFullPath(this.brandConfig[key].path);
    let content = fs.readFileSync(path).toString();
    for (const idx in this.brandConfig[key].replace) {
      content = content.replace(
        regex
          ? new RegExp(this.brandConfig[key].replace[idx].from, "g")
          : this.brandConfig[key].replace[idx].from,
        this.brandConfig[key].replace[idx].to
      );
    }
    fs.writeFileSync(path, content);
    this.log(chalk.green(`\n == INFO: ${key} file modified! ==\n`));
  }

  moveBuildArtifactsToJboss = () => {
    this.log(
      chalk.green("\n == INFO: moveBuildArtifactsToJboss started! ==\n")
    );
    const backupPath = `${config.jboss.deployments}/backups/${Date.now()}`;

    fs.ensureDirSync(`${config.jboss.deployments}/${this.brand}pl.war`);
    fs.ensureDirSync(`${config.jboss.deployments}/webassets.war`);

    fs.moveSync(
      `${config.jboss.deployments}/${this.brand}pl.war`,
      `${backupPath}/${this.brand}pl.war`
    );
    fs.moveSync(
      `${config.jboss.deployments}/webassets.war`,
      `${backupPath}/webassets.war`
    );
    this.log(
      chalk.green(
        "\n == INFO: Old deployments are backed up successfully!. ==\n"
      )
    );

    fs.copy(
      `${this.resolveFullPath(this.brandConfig[`${this.brand}.war`])}`,
      `${config.jboss.deployments}/${this.brand}pl.war`
    );
    fs.copy(
      `${this.resolveFullPath(this.brandConfig["webassets.war"])}`,
      `${config.jboss.deployments}/webassets.war`
    );
    this.log(
      chalk.green(
        "\n == INFO: New files are moved deployments in JBOSS successfully!. ==\n"
      )
    );
  };

  private triggerDoDeploy() {
    fs.ensureFileSync(
      `${config.jboss.deployments}/${this.brand}pl.war.deployed`
    );
    fs.ensureFileSync(`${config.jboss.deployments}/webassets.war.deployed`);

    fs.renameSync(
      `${config.jboss.deployments}/${this.brand}pl.war.deployed`,
      `${config.jboss.deployments}/${this.brand}pl.war.dodeploy`
    );
    fs.renameSync(
      `${config.jboss.deployments}/webassets.war.deployed`,
      `${config.jboss.deployments}/webassets.war.dodeploy`
    );
    this.log(
      chalk.green("\n == INFO: Initiated JBOSS dodeploy successfully!. ==\n")
    );
  }
}
