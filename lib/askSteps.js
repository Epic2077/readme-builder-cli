import inquirer from "inquirer";

export default async function askSteps() {
  const steps = [];

  while (true) {
    const { description } = await inquirer.prompt({
      type: "input",
      name: "description",
      message: "Step description (Leave empty to finish):",
    });

    if (!description.trim()) break;

    const { code } = await inquirer.prompt({
      type: "input",
      name: "code",
      message: "Optional Bash snippet (Leave empty to skip):",
    });

    steps.push({
      description: description.trim(),
      code: code.trim(),
    });
  }

  return steps;
}
