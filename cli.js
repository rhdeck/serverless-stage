#!/usr/bin/env node
const cp = require("child_process");
const { findStage } = require("./index");
const stage = findStage();
let args = process.argv.slice(2);
if (args[0] == "setup") {
  cp.spawnSync("yarn", ["serverless-setup", "--stage", stage], {
    stdio: "inherit"
  });
} else {
  const setupRequiredCommands = ["deploy"];
  const commands = args.filter(arg => !arg.includes("-"));

  if (commands.filter(cmd => setupRequiredCommands.includes(cmd)).length) {
    cp.spawnSync("yarn", ["serverless-setup", "--stage", stage], {
      stdio: "inherit"
    });
  }
  if (!args.find(arg => arg == "--stage" || arg == "-s")) {
    args = [...args, "--stage", stage];
  }
  cp.spawnSync("yarn", ["sls", ...args], {
    stdio: "inherit"
  });
}
