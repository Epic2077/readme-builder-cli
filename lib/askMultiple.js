import inquirer from "inquirer";

export default async function askMultiple(promptMessage) {
  const items = [];
  while (true) {
    const { step } = await inquirer.prompt({
      type: "input",
      name: "step",
      message: `${promptMessage} (Leave empty to skip):`,
    });

    if (!step.trim()) break;
    items.push(step.trim());
  }
  return items;
}
