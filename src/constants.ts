import * as path from "path";
import * as vscode from "vscode";
import * as fs from "fs-extra";

const _PROJ_PATH = path.dirname(__dirname);
let _TEM_PATH;

const configPath = vscode.workspace
  .getConfiguration()
  .get("CustomNewFolder.template.path") as string;

if (configPath === "") {
  _TEM_PATH = path.join(_PROJ_PATH, "templates");
} else {
  _TEM_PATH = path.join(configPath);
  // console.log(_TEM_PATH);
  if (!fs.existsSync(_TEM_PATH)) {
    throw Error("no such template path");
  }
}

export const TEM_PATH = _TEM_PATH;
export const PROJ_PATH = _PROJ_PATH;
