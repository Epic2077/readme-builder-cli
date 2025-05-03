import inquirer from "inquirer";

const askInstallationSteps = async () => {
  const guides = [];
  const steps = [];
  let addMore = true;

  while (addMore) {
    const { guide } = await inquirer.prompt([
      {
        type: "input",
        name: "guide",
        message:
          "Enter a guide for the installation steps (Press q to finish):",
      },
    ]);
    const { step } = await inquirer.prompt([
      {
        type: "input",
        name: "step",
        message: "Enter an installation step:",
      },
    ]);

    if (guide.trim().toLowerCase() === "q") {
      addMore = false;
    } else {
      guides.push(guide.trim());
      steps.push(step.trim());
    }
  }

  return { steps, guides };
};

export default askInstallationSteps;
