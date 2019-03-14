import * as vscode from 'vscode';
import opn = require('opn');
import validUrl = require('valid-url');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.searchWithCursor', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		opn(getText(editor));
	});

	context.subscriptions.push(disposable);
}

function pickUrl(text: string): string {
	return validUrl.isWebUri(text) ? text : `https://www.google.com/search?q=${text.trim().replace(/\n+/g, ' ')}`;
}

function getText(editor: vscode.TextEditor): string {
	const selection = editor.selection;
	if (selection.isEmpty) {
		const text = editor.document.lineAt(selection.start.line).text;
		return text ? pickUrl(text) : 'https://www.google.com';
	}

	return pickUrl(editor.document.getText(selection));
}

export function deactivate() {}
