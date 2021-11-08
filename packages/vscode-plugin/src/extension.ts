// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const activeEditor = vscode.window.activeTextEditor;

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vika-i18n" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vika-i18n.replaceTextWithKey', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// 获取选区文本https://github.com/microsoft/vscode-extension-samples/blob/main/document-editing-sample/src/extension.ts
		if (activeEditor) {
			const document = activeEditor.document;
			const selection = activeEditor.selection;
			// Get the word within the selection
			const word = document.getText(selection);
			// 查询接口
			const query = `https://api.github.com/search/repositories?q=${word}`;
			activeEditor.edit(editBuilder => {
				editBuilder.replace(selection, query);
			});
			vscode.window.showInformationMessage(word);
		}

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
