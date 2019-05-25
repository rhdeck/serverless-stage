#!/usr/bin/env node
const cp = require("child_process");
const { findStage, findProfile } = require("./index");
const stage = findStage();
const profile = findProfile();
let args = process.argv.slice(2);
const stageArray = stage ? ["--stage", stage] : [];
const profileArray = profile ? ["--aws-profile", profile] : [];
if (args[0] == "setup") {
  cp.spawnSync(
    "yarn",
    ["run", "serverless-setup", ...stageArray, ...profileArray],
    {
      stdio: "inherit"
    }
  );
} else {
  const setupRequiredCommands = ["deploy"];
  const commands = args.filter(arg => !arg.includes("-"));

  if (commands.filter(cmd => setupRequiredCommands.includes(cmd)).length) {
    cp.spawnSync(
      "yarn",
      ["run", "serverless-setup", ...stageArray, ...profileArray],
      {
        stdio: "inherit"
      }
    );
  }
  if (!args.find(arg => arg == "--stage" || arg == "-s")) {
    args = [...args, ...stageArray];
  }
  cp.spawnSync("yarn", ["run", "serverless", ...args, ...profileArray], {
    stdio: "inherit"
  });
}
