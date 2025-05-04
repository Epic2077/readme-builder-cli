export default function generateCustomReadme(sections) {
  let md = "";

  const tableOfContents = Object.keys(sections)
    .map((key) => {
      const title = key
        .split(/(?=[A-Z])|_/)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      const link = title.toLowerCase().replace(/ /g, "-");
      return `- [${title}](#${link})`;
    })
    .join("\n");

  sections.forEach((section) => {
    const { type, content } = section;

    switch (type) {
      case "title":
        md += `# ${content}\n\n`;
        break;
      case "description":
        md += `## Description\n${content}\n\n`;
        break;
      case "tableOfContents":
        md += `## Table of Contents\n${tableOfContents}\n\n`;
      case "features":
        md += `## Features\n${content.map((s) => `- ${s}`).join("\n")}\n\n`;
        break;
      case "overview":
        md += `## Overview\n${content}\n\n`;
        break;
      case "installation":
        md += `## Installation\n`;
        content.forEach(({ description, code, i }) => {
          md += ` ### ${i + 1}. ${description}\n`;
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
