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

module.exports = {
  findStage,
  findProfile
};
