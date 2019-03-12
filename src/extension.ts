import * as vscode from 'vscode';
import opn = require('opn');
import validUrl = require('valid-url');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		opn(getText(editor), { app: ['google chrome'] });
	});

	context.subscriptions.push(disposable);
}

function getText(editor: vscode.TextEditor) {
	const selection = editor.selection;
	if (selection.isEmpty) {
		const text = editor.document.lineAt(selection.start.line).text;
		return text ? `https://www.google.com/search?q=${text}` : 'https://www.google.com';
	}

	const text = editor.document.getText(selection);
	return validUrl.isWebUri(text) ? text : `https://www.google.com/search?q=${text.replace(/\n+/g, ' ')}`;
}

export function deactivate() {}
