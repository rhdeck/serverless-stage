const path = require("path");
// const commander = require("commander");
let _stage = "";
let _profile = "";

function findStage(dir = process.cwd()) {
  if (_stage) return _stage;
  //assuming at least one servless dependency in tree has stage defined
  const { stage, serverless: { dependencies } = {} } = require(path.join(
    dir,
    "package.json"
  ));
  if (stage) {
    _stage = stage;
    return stage;
  }
  if (!dependencies) return false;
  const deps = Object.keys(dependencies);
  let parentStage = false;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentStage = findStage(nextDir);
    process.chdir(cwd);
    if (parentStage) break;
  }
  if (parentStage) _stage = parentStage;
  return parentStage;
}
function findProfile(dir = process.cwd()) {
  if (_profile) return _profile;
  //assuming at least one servless dependency in tree has stage defined
  const { profile, serverless: { dependencies } = {} } = require(path.join(
    dir,
    "package.json"
  ));
  if (profile) {
    _profile = profile;
    return profile;
  }
  if (!dependencies) return false;
  const deps = Object.keys(dependencies);
  let parentProfile = false;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentProfile = findProfile(nextDir);
    process.chdir(cwd);
    if (parentProfile) break;
  }
  if (parentProfile) _profile = parentProfile;
  return parentProfile;
}
function findRegion(dir = process.cwd()) {
  if (_profile) return _profile;
  //assuming at least one servless dependency in tree has stage defined
  const { profile, serverless: { dependencies } = {} } = require(path.join(
    dir,
    "package.json"
  ));
  if (region) {
    _region = region;
    return region;
  }
  if (!dependencies) return false;
  const deps = Object.keys(dependencies);
  let parentProfile = false;
  const cwd = process.cwd();
  for (let i = 0; i < deps.length; i++) {
    let key = deps[i];
    let nextDir = path.resolve(dependencies[key]);
    process.chdir(nextDir);
    parentProfile = findRegion(nextDir);
    process.chdir(cwd);
    if (parentProfile) break;
  }
  if (parentProfile) _region = parentProfile;
  return parentProfile;
}
function getRegion() {
  const region = findRegion();
  if (region) return region;
  else return "us-east-1"; // environmental default
}
function configAWS(AWS) {
  const profile = findProfile();
  if (profile) {
    const credentials = new AWS.SharedIniFileCredentials({ profile });
    AWS.config.credentials = credentials;
  }
  return AWS;
}
module.exports = {
  findStage,
  findProfile,
  findRegion,
  getRegion,
  configAWS
};
