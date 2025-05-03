export default function generateReadme(answers) {
  const { guides, steps } = answers.installation;

  const installationSection = guides
    .map(
      (guide, i) => `### ${i + 1}. ${guide}

\`\`\`
${steps[i]}
\`\`\``
    )
    .join("\n\n");

  return `
# ${answers.title}

## Description
  ${answers.description}

## Installation
 ${installationSection}


## Usage
  ${answers.usage}

## Technologies Used
  ${answers.technologies}

## License
  This project is licensed under the ${answers.license} license.

  ## Created by
  [${answers.github}](https://github.com/${answers.github})
  `;
}
