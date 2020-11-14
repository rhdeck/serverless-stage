#!/usr/bin/env node
import { spawnSync } from "child_process";
import { existsSync } from "fs";
import { findStage, findProfile, findName, findRegion } from "./index";
const stage = findStage();
const profile = findProfile();
const name = findName();
const region = findRegion();
let args = process.argv.slice(2);
const nameArray = name ? ["--stack-name", name] : [];
const stageArray = stage ? ["--stage", stage] : [];
const profileArray = profile ? ["--aws-profile", profile] : [];
const regionArray = region ? ["--region", region] : [];
if (args[0] == "setup") {
  spawnSync(
    "yarn",
    [
      "run",
      "serverless-setup",
      ...stageArray,
      ...regionArray,
      ...profileArray,
      ...nameArray,
    ],
    {
      stdio: "inherit",
    }
  );
} else {
  const setupRequiredCommands = ["deploy"];
  const remap: { [key: string]: string } = { deployskip: "deploy" };

  const commands = args.filter((arg) => !arg.includes("-"));

  if (commands.some((cmd) => setupRequiredCommands.includes(cmd))) {
    const { status, signal } = spawnSync(
      "yarn",
      [
        "run",
        "serverless-setup",
        ...stageArray,
        ...regionArray,
        ...profileArray,
        ...nameArray,
      ],
      {
        stdio: "inherit",
      }
    );
    if (status !== 0) {
      throw new Error(`setup failed with status code ${status}`);
    }
  }
  if (!args.find((arg) => arg == "--stage" || arg == "-s")) {
    args = [...args.map((a) => remap[a] || a), ...stageArray];
  }
  if (!args.find((arg) => arg == "--region" || arg == "-r")) {
    args = [...args.map((a) => remap[a] || a), ...regionArray];
  }
  if (existsSync("node_modules/serverless/bin/serverless.js")) {
    const { signal, status } = spawnSync(
      "node",
      ["node_modules/serverless/bin/serverless.js", ...args, ...profileArray],
      {
        stdio: "inherit",
      }
    );
    if (status !== 0) {
      throw new Error(`setup failed with status code ${status}`);
    }
  } else {
    const { signal, status } = spawnSync(
      "yarn",
      ["run", "-s", "serverless", ...args, ...profileArray],
      {
        stdio: "inherit",
      }
    );
    if (status !== 0) {
      throw new Error(`setup failed with status code ${status}`);
    }
  }
}
