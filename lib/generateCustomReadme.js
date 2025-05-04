export default function generateCustomReadme(answers, sections) {
  let md = "";

  sections.forEach((key) => {
    switch (key) {
      case "title":
        md += `# ${answers.title}\n\n`;
        break;
      case "description":
        md += `## Description\n${answers.description}\n\n`;
        break;
      case "overview":
        md += `## Overview\n${answers.overview}\n\n`;
        break;
      case "installation":
        md += `## Installation\n${answers.installation}\n\n`;
        break;
      case "usage":
        md += `## Usage\n${answers.usage}\n\n`;
        break;
      case "technologies":
        md += `## Technologies\n${answers.technologies
          .split(",")
          .map((t) => `- ${t.trim()}`)
          .join("\n")}\n\n`;
        break;
      case "contribution":
        md += `## Contributing\n${answers.contribution}\n\n`;
        break;
      case "license":
        md += `## License\nThis project is licensed under the ${answers.license} license.\n\n`;
        break;
      case "github":
        md += `## Created by\n[${answers.github}](https://github.com/${answers.github})\n\n`;
        break;
    }
  });

  return md.trim() + "\n";
}
