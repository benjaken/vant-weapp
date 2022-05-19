const ci = require('miniprogram-ci');
const path = require('path');
const config = require('../example/project.config.json');
const package = require('../package.json');
const dayjs = require('dayjs');

const project = new ci.Project({
  appid: config.appid,
  type: 'miniProgram',
  projectPath: path.join(__dirname, '../example'),
  privateKeyPath: path.join(__dirname, './private.wxeeafd0a624c7d877.key'),
  ignores: ['node_modules/**/*'],
});

ci.upload({
  project,
  version: `${package.version}.${dayjs().format('YYYYMMDD')}.release`,
  desc: package.description,
  setting: config.setting,
});
