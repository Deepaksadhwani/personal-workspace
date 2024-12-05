import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "body-case": [RuleConfigSeverity.Error, "always", "sentence-case"],
    "body-max-line-length": [RuleConfigSeverity.Warning, "always", 72],
    "header-max-length": [RuleConfigSeverity.Warning, "always", 52],
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build", // Changes to the build system, build scripts, or external dependencies (e.g., package manager setup).
        "change", // General changes that don't fit into a specific category (usually not commonly used).
        "chore", // Maintenance tasks, like updating dependencies or refactoring code without changing functionality.
        "ci", // Modifications to Continuous Integration (e.g., CI/CD pipeline configurations or scripts).
        "deprecate", // Marking a feature or API as deprecated and indicating that it will be removed in future versions.
        "docs", // Documentation updates, including README changes or inline code comments.
        "feat", // Introducing a new feature or adding functionality to the project.
        "fix", // Bug fixes or correcting errors in the existing codebase.
        "perf", // Performance improvements or optimizations.
        "refactor", // Restructuring code without changing its behavior (e.g., refactoring for better readability or maintainability).
        "remove", // Removing deprecated or unused features or code.
        "revert", // Reverting changes from a previous commit, effectively undoing them.
        "security", // Updates that address security vulnerabilities or improvements.
        "style", // Changes that affect code style, formatting, or aesthetic improvements (no functional impact).
        "test", // Changes related to tests (e.g., adding new tests, fixing test cases, or improving test coverage).
      ],
    ],
  },
};

export default Configuration;
