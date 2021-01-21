// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { fetchTemplateOptions, cpTemplates } from "./utils";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "new-folder" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "new-folder.helloWorld",
    (arg) => {
      vscode.window.showQuickPick(fetchTemplateOptions()).then((temp) => {
        if (temp) {
          vscode.window.showInformationMessage(`You choose template: ${temp}`);
          const _dest = fs.lstatSync(arg.path).isDirectory()
            ? arg.path
            : path.dirname(arg.path);
          const dest = path.join(_dest, temp);
          const res = cpTemplates(temp, dest);
          if (res.code === 200) {
            vscode.window.showInformationMessage(res.message);
          } else {
            vscode.window.showErrorMessage(res.message);
          }
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
