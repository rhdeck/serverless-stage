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
      stdio: "inherit",
    }
  );
} else {
  const setupRequiredCommands = ["deploy"];
  const remap = { deployskip: "deploy" };

  const commands = args.filter((arg) => !arg.includes("-"));

  if (commands.some((cmd) => setupRequiredCommands.includes(cmd))) {
    cp.spawnSync(
      "yarn",
      ["run", "serverless-setup", ...stageArray, ...profileArray, ...nameArray],
      {
        stdio: "inherit",
      }
    );
  }

  if (!args.find((arg) => arg == "--stage" || arg == "-s")) {
    args = [...args.map((a) => remap[a] || a), ...stageArray];
  }
  cp.spawnSync("yarn", ["run", "serverless", ...args, ...profileArray], {
    stdio: "inherit",
  });
}
