export default function generateReadme(answers) {
  const { guides, steps } = answers.installation;

  const installationSection = guides
    .map(
      (guide, i) => `### ${i + 1}. ${guide}

\`\`\`bash
${steps[i]}
\`\`\``
    )
    .join("\n\n");

  const technologies = answers.technologies;
  const technologiesSection = technologies
    .map((tech) => `- ${tech}`)
    .join("\n");

  const tableOfContents = Object.keys(answers)
    .filter((key) => !["img", "description", "title"].includes(key))
    .map((key) => {
      const title = key
        .split(/(?=[A-Z])|_/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const link = title.toLowerCase().replace(/ /g, "-");
      return `- [${title}](#${link})`;
    })
    .join("\n");

  return `
<div align="center">
<img src="${answers.img}" alt="${answers.title}" >
</div>

# ${answers.title}

## Description
${answers.description}

## Table of Contents
${tableOfContents}

## Overview
${answers.overview}

## Technologies Used
Below is a list of the technologies used in this project:

${technologiesSection}

## Installation
${installationSection}

## Usage
${answers.usage}

${
  answers.contribution === "yes"
    ? `## Contributing \nContributions are welcome! Please fork the repository and submit a pull request with your changes.`
    : ""
}

## License
This project is licensed under the ${answers.license} license.

## Created by
[${answers.github}](https://github.com/${answers.github})
`;
}
