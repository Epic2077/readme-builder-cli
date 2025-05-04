#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import prompts from "../questions/prompts.js";
import generateReadme from "../lib/generateReadme.js";
import askInstallationSteps from "../lib/installationsteps.js";
import fs from "fs/promises";
import askTechnologies from "../lib/technologies.js";
import askMultiple from "../lib/askMultiple.js";
import generateCustomReadme from "../lib/generateCustomReadme.js"; // ✅ Fixed import

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
      { name: "Start a custom README generation", value: "custom" }, // ✅ Fixed value
      { name: "Exit", value: "exit" },
    ],
  });
  return cmd;
}

(async () => {
  while (true) {
    let cmd = process.argv[2];
    if (!cmd) {
      cmd = await chooseCommand();
    }

    if (cmd === "help") {
      console.log(chalk.yellow("Available commands:"));
      console.log(chalk.green("  help") + "  Show available commands");
      console.log(
        chalk.green("  template") + "  Start README generation using a template"
      );
      console.log(
        chalk.green("  custom") + "  Start a custom README generation"
      );
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
        chalk.blue("You can now open and review your README.md file.\n")
      );

      const readmeContent = await fs.readFile("README.md", "utf-8");
      console.log("📄 Generated README content:\n");
      console.log(chalk.gray(readmeContent));
      break;
    } else if (cmd === "custom") {
      const { sections } = await inquirer.prompt({
        type: "checkbox",
        name: "sections",
        message: "Which sections do you want to include?",
        choices: [
          { name: "Title", value: "title" },
          { name: "Description", value: "description" },
          { name: "Overview", value: "overview" },
          { name: "Installation", value: "installation" },
          { name: "Usage", value: "usage" },
          { name: "Technologies", value: "technologies" },
          { name: "Contributing", value: "contribution" },
          { name: "License", value: "license" },
          { name: "GitHub Info", value: "github" },
        ],
        validate: (sel) => sel.length > 0 || "Select at least one section",
      });

      const customAnswers = {};
      for (const sec of sections) {
        if (sec === "installation") {
          customAnswers.installation = await askMultiple(
            "Add an installation step"
          );
        } else if (sec === "technologies") {
          customAnswers.technologies = await askMultiple(
            "Add a technology used"
          );
        } else {
          const { [sec]: value } = await inquirer.prompt({
            type: "input",
            name: sec,
            message: `Enter ${sec} content:`,
          });
          customAnswers[sec] = value;
        }
      }

      const customContent = generateCustomReadme(customAnswers, sections);
      await fs.writeFile("README.md", customContent);
      console.log(chalk.green("✅ Custom README.md generated!"));
      break;
    } else if (cmd === "exit") {
      process.exit(0);
    } else {
      console.log(chalk.red(`Unknown command: ${cmd}`));
      console.log(chalk.yellow("Type 'help' to see available commands."));
      continue;
    }
  }
})();
