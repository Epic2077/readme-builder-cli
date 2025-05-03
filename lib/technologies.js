import inquirer from "inquirer";

const askTechnologies = async () => {
  const technologies = [];

  let addMore = true;

  while (addMore) {
    const { technology } = await inquirer.prompt([
      {
        type: "input",
        name: "technology",
        message: "Enter a technology used (Press q to finish):",
      },
    ]);
    if (technology.trim().toLowerCase() === "q") {
      break;
    }

    technologies.push(technology.trim());
  }
  return technologies;
};

export default askTechnologies;
