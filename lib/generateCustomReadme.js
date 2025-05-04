export default function generateCustomReadme(sections) {
  let md = "";

  sections.forEach((section) => {
    const { type, content } = section;

    switch (type) {
      case "title":
        md += `# ${content}\n\n`;
        break;
      case "description":
        md += `## Description\n${content}\n\n`;
        break;
      case "features":
        md += `## ✨ Features\n${content.map((s) => `- ${s}`).join("\n")}\n\n`;
        break;
      case "overview":
        md += `## Overview\n${content}\n\n`;
        break;
      case "installation":
        md += `## Installation\n`;
        content.forEach(({ description, code }) => {
          md += `- ${description}\n`;
          if (code) {
            md += `\n\`\`\`bash\n${code}\n\`\`\`\n`;
          }
          md += `\n`;
        });
        break;
      case "usage":
        md += `## Usage\n${content}\n\n`;
        break;
      case "technologies":
        md += `## Technologies\n${content.map((t) => `- ${t}`).join("\n")}\n\n`;
        break;
      case "contribution":
        md += `## Contributing\n${content}\n\n`;
        break;
      case "license":
        md += `## License\nThis project is licensed under the ${content} license.\n\n`;
        break;
      case "github":
        md += `## Created by\n[${content}](https://github.com/${content})\n\n`;
        break;
      case "custom":
        md += `## ${section.header}\n${section.content}\n\n`;
        break;
    }
  });

  return md.trim() + "\n";
}
