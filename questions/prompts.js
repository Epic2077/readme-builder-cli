export default [
  {
    type: "input",
    name: "img",
    message: "What is the banner image URL?",
  },
  {
    type: "input",
    name: "title",
    message: "What is the project title?",
  },
  //   {
  //     type: "editor",
  //     name: "description",
  //     message: "Provide a description of your project:",
  //     validate: (text) =>
  //       text.trim().length > 0 || "Please enter at least one line",
  //   },
  {
    type: "input",
    name: "description",
    message: "Provide a description of your project:",
  },
  {
    type: "input",
    name: "overview",
    message: "What is the overview of this project?",
  },
  {
    type: "input",
    name: "technologies",
    message: "What technologies were used?",
  },
  {
    type: "input",
    name: "usage",
    message: "How to use/run the project",
  },
  {
    type: "list",
    name: "contribution",
    choices: [
      { name: "Allow Contributions?", value: "yes" },
      { name: "I don't want anyone to contribute", value: "no" },
    ],
  },
  {
    type: "input",
    name: "license",
    message: "What is the license for this project?",
  },
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
  },
];
