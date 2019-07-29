import { Command, flags } from "@oclif/command";
import BuildRunner from "../libs/buildRunner";

export default class Build extends Command {
  static description =
    "Trigers the build process to create the local setup to run the code locally in jboss.";

  static examples = [
    `$ annic build <brand name here> (default brand set to lg)`
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-b, --brand=VALUE)
    brand: flags.string({ char: "b", description: "brand to build" })
  };

  async run() {
    try {
      const { flags } = this.parse(Build);
      const brand = flags.brand || "lg";
      const buildRunner = new BuildRunner(brand);
      await buildRunner.build();
    } catch (error) {
      this.error(error);
    }
  }
}
