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
import askSteps from "../lib/askSteps.js";

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
    } else if (cmd === "custom") {
      const sections = [];

      while (true) {
        const { sectionType } = await inquirer.prompt({
          type: "list",
          name: "sectionType",
          message: "What section do you want to add?",
          choices: [
            { name: "🔧 Custom section", value: "custom" },
            { name: "Title", value: "title" },
            { name: "Description", value: "description" },
            { name: "Overview", value: "overview" },
            { name: "Usage", value: "usage" },
            { name: "Installation (multi-step)", value: "installation" },
            { name: "Technologies (multi-step)", value: "technologies" },
            { name: "Contributing", value: "contribution" },
            { name: "License", value: "license" },
            { name: "GitHub Info", value: "github" },
            new inquirer.Separator(),
            { name: "✅ Finish", value: "finish" },
            new inquirer.Separator(),
          ],
        });

        if (sectionType === "finish") break;

        if (sectionType === "installation") {
          const steps = await askSteps("Add an installation step");
          sections.push({ type: "installation", content: steps });
        } else if (sectionType === "technologies") {
          const techs = await askMultiple("Add a technology used");
          sections.push({ type: "technologies", content: techs });
        } else if (sectionType === "custom") {
          const { header, content } = await inquirer.prompt([
            {
              type: "input",
              name: "header",
              message: "Enter your custom section title:",
            },
            {
              type: "editor",
              name: "content",
              message: `Enter the content for this section:`,
            },
          ]);
          sections.push({ type: "custom", header, content });
        } else {
          const { content } = await inquirer.prompt({
            type: "input",
            name: "content",
            message: `Enter content for ${sectionType}:`,
          });
          sections.push({ type: sectionType, content });
        }
      }

      const content = generateCustomReadme(sections);
      await fs.writeFile("README.md", content);
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
