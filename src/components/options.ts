const op2 = [
  {
    value: "csharp",
    label: "csharp",
  },
  {
    value: "go",
    label: "go",
  },
  {
    value: "java",
    label: "java",
  },
  {
    value: "javascript",
    label: "javascript",
  },
  {
    value: "kotlin",
    label: "kotlin",
  },
  {
    value: "perl",
    label: "perl",
  },
  {
    value: "php",
    label: "php",
  },
  {
    value: "ruby",
    label: "ruby",
  },
  {
    value: "scala",
    label: "scala",
  },
  {
    value: "swift",
    label: "swift",
  },
  {
    value: "typescript",
    label: "typescript",
  },
];
const op1 = [
  {
    value: "cpp",
    label: "cpp",
  },
  {
    value: "csharp",
    label: "csharp",
  },
  {
    value: "elixir",
    label: "elixir",
  },
  {
    value: "d",
    label: "d",
  },
  {
    value: "go",
    label: "go",
  },
  {
    value: "haskell",
    label: "haskell",
  },
  {
    value: "java",
    label: "java",
  },
  {
    value: "julia",
    label: "julia",
  },
  {
    value: "lua",
    label: "lua",
  },
  {
    value: "meta-language",
    label: "meta-language",
  },
  {
    value: "php",
    label: "php",
  },
  {
    value: "perl",
    label: "perl",
  },
  {
    value: "python",
    label: "python",
  },
  {
    value: "R",
    label: "R",
  },
  {
    value: "ruby",
    label: "ruby",
  },
  {
    value: "racket",
    label: "racket",
  },
  {
    value: "rust",
    label: "rust",
  },
  {
    value: "scala",
    label: "scala",
  },
  {
    value: "bash",
    label: "bash",
  },
  {
    value: "swift",
    label: "swift",
  },
  {
    value: "typescript",
    label: "typescript",
  },
];
export const options = [
  {
    value: "APPS",
    label: "APPS",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "HumanEval",
    label: "HumanEval",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "MBPP",
    label: "MBPP",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "multipl-humaneval",
    label: "multipl-humaneval",
    children: op1,
  },
  {
    value: "multipl-mbpp",
    label: "multipl-mbpp",
    children: op1,
  },
  {
    value: "MBXP-humaneval",
    label: "MBXP-humaneval",
    children: op2,
  },
  {
    value: "MBXP",
    label: "MBXP",
    children: op2,
  },
  {
    value: "DS-1000",
    label: "DS-1000",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "ODEX",
    label: "ODEX",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "humaneval+",
    label: "humaneval+",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "mbpp+",
    label: "mbpp+",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "humaneval-x",
    label: "humaneval-x",
    children: [
      {
        value: "python",
        label: "python",
      },
      {
        value: "java",
        label: "java",
      },
      {
        value: "javascript",
        label: "javascript",
      },
      {
        value: "go",
        label: "go",
      },
      {
        value: "cpp",
        label: "cpp",
      },
    ],
  },
  {
    value: "humaneval-pack",
    label: "humaneval-pack",
    children: [
      {
        value: "python",
        label: "python",
      },
      {
        value: "java",
        label: "java",
      },
      {
        value: "javascript",
        label: "javascript",
      },
      {
        value: "go",
        label: "go",
      },
      {
        value: "cpp",
        label: "cpp",
      },
      {
        value: "rust",
        label: "rust",
      },
    ],
  },
  {
    value: "CrossCodeEval",
    label: "CrossCodeEval",
    children: [
      {
        value: "python",
        label: "python",
      },
    ],
  },
  {
    value: "CRUXEval",
    label: "CRUXEval",
    children: [
      {
        value: "python",
        label: "python",
      },
      {
        value: "Java",
        label: "Java",
      },
      {
        value: "TypeScript",
        label: "TypeScript",
      },
      {
        value: "csharp",
        label: "csharp",
      },
    ],
  },
  {
    value: "NaturalCodeBench",
    label: "NaturalCodeBench",
    children: [
      {
        value: "python",
        label: "python",
      },
      {
        value: "java",
        label: "java",
      },
    ],
  },
];
