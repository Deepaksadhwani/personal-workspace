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
        "build",
        "change",
        "chore",
        "ci",
        "deprecate",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "remove",
        "revert",
        "security",
        "style",
        "test",
      ],
    ],
  },
};

export default Configuration;
