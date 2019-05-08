// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { workspace } from 'vscode';

const cmderLocation = workspace
  .getConfiguration('cmder-here')
  .get('cmderLocation');
// const workspaceLocation = workspace.workspaceFolders[0].uri.fsPath;
const cp = require('child_process');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "cmder-here" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'cmder-here.cmder here',
    (uri: vscode.Uri) => {
      // The code you place here will be executed every time your command is executed
      let command = `"${cmderLocation}" /START "${uri.fsPath}"`;

      cp.exec(command);

      // Display a message box to the user
      vscode.window.showInformationMessage(
        'Opening Cmder at the current workspace folder'
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
