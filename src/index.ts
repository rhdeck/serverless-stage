import AWS from "aws-sdk";
import path from "path";
import { getServerlessConfig } from "@raydeck/serverless-base";
let _stage = "";
export function findStage(dir: string = process.cwd()) {
  if (_stage) return _stage;
  const { stage, dependencies } = <
    { stage?: string; dependencies?: { [key: string]: string } }
  >getServerlessConfig(dir);
  if (stage) {
    _stage = stage;
    return stage;
  }
  if (!dependencies) return;
  const deps = Object.keys(dependencies);
  let parentStage: string | undefined;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentStage = findStage(nextDir);
    process.chdir(cwd);
    if (parentStage) break;
  }
  if (parentStage) {
    _stage = parentStage;
    return parentStage;
  }
}
let _name = "";
export function findName(dir = process.cwd(), baseName = "base") {
  if (_name) return _name;
  //assuming at least one servless dependency in tree has stage defined
  const { dependencies } = <{ dependencies?: { [key: string]: string } }>(
    getServerlessConfig(dir)
  );
  if (!dependencies) return;
  const base: string | undefined = dependencies[baseName];
  if (!base) return;
  //open base
  const { name } = <{ name?: string }>getServerlessConfig(base);
  if (!name) return;
  _name = name;
  return name;
}
let _profile = "";
export function findProfile(dir = process.cwd()) {
  if (_profile) return _profile;
  //assuming at least one servless dependency in tree has stage defined
  const { profile, dependencies } = <
    { profile?: string; dependencies?: { [key: string]: string } }
  >getServerlessConfig(dir);
  if (profile) {
    _profile = profile;
    return profile;
  }
  if (!dependencies) return;
  const deps = Object.keys(dependencies);
  let parentProfile: string | undefined;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentProfile = findProfile(nextDir);
    process.chdir(cwd);
    if (parentProfile) break;
  }
  if (parentProfile) {
    _profile = parentProfile;
    return parentProfile;
  }
}
let _region = "";
export function findRegion(dir = process.cwd()) {
  if (_region) return _region;
  //assuming at least one servless dependency in tree has stage defined
  const { region, dependencies } = <
    { region?: string; dependencies?: { [key: string]: string } }
  >getServerlessConfig(dir);
  if (region) {
    _region = region;
    return region;
  }
  if (!dependencies) return;
  const deps = Object.keys(dependencies);
  let parentProfile: string | undefined;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentProfile = findRegion(nextDir);
    process.chdir(cwd);
    if (parentProfile) break;
  }
  if (parentProfile) {
    _region = parentProfile;
    return parentProfile;
  }
}
export function getRegion(dir = process.cwd()) {
  const region = findRegion(dir);
  if (region) return region;
  else return "us-east-1"; // environmental default
}
export function configAWS(
  AWS: any,
  profile: string | undefined = findProfile()
) {
  if (profile) {
    const credentials = new AWS.SharedIniFileCredentials({ profile });
    AWS.config.credentials = credentials;
  }
  return AWS;
}
configAWS(AWS);
