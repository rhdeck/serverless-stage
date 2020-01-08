#!/usr/bin/env node
const cp = require("child_process");
const { findStage, findProfile, findName } = require("./index");
const stage = findStage();
const profile = findProfile();
const name = findName();
let args = process.argv.slice(2);
const nameArray = name ? ["--name", name] : [];
const stageArray = stage ? ["--stage", stage] : [];
const profileArray = profile ? ["--aws-profile", profile] : [];
if (args[0] == "setup") {
  cp.spawnSync(
    "yarn",
    ["run", "serverless-setup", ...stageArray, ...profileArray, ...nameArray],
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
      ["run", "serverless-setup", ...stageArray, ...profileArray, ...nameArray],
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
