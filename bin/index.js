#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import prompts from "../questions/prompts.js";
import generateReadme from "../lib/generateReadme.js";
import askInstallationSteps from "../lib/installationsteps.js";
import fs from "fs/promises";
import askTechnologies from "../lib/technologies.js";

console.log(chalk.blue.bold("🚀 readme-builder-cli started!"));

async function chooseCommand() {
  const { cmd } = await inquirer.prompt({
    type: "list",
    name: "cmd",
    message: "What would you like to do?",
    choices: [
      new inquirer.Separator(),
      { name: "Show available commands", value: "help" },
      { name: "Start README generation with a template", value: "template" },
      { name: "Start a custom README generation", value: "template" },
      { name: "Exit", value: "exit" },
    ],
  });
  return cmd;
}

(async () => {
  while (true) {
    // 1) read the CLI arg, or if none, prompt the user
    let cmd = process.argv[2];
    if (!cmd) {
      cmd = await chooseCommand();
    }

    // 2) handle it
    if (cmd === "help") {
      console.log(chalk.yellow("Available commands:"));
      console.log(chalk.green("  help") + "  Show available commands");
      console.log(
        chalk.green("  start with template") +
          "  Start README generation using a template"
      );
      console.log(
        chalk.green("  start a custom README") +
          "  Start a custom README generation"
      );
      // loop back to prompt
      continue;
    } else if (cmd === "template") {
      console.log(chalk.green("Starting the README generation process..."));

      const answers = await inquirer.prompt(prompts);

      const installationSteps = await askInstallationSteps();

      const technologies = await askTechnologies();

      answers.installation = installationSteps;
      answers.technologies = technologies;
      const content = generateReadme(answers);

      await fs.writeFile("README.md", content);
      console.log("\n✅ README.md file generated successfully!");
      console.log(
        chalk.blue("You can now open and review your README.md file.")
      );

      const readmeContent = await fs.readFile("README.md", "utf-8");
      console.log("\n📄 Generated README content:\n");
      console.log(chalk.gray(readmeContent));
      break; // or continue if you want to stay in the loop
    } else if (cmd === "exit") {
      process.exit(0);
    } else {
      console.log(chalk.red(`Unknown command: ${cmd}`));
      console.log(chalk.yellow("Type 'help' to see available commands."));
      // loop back to prompt
      continue;
    }
  }
})();
