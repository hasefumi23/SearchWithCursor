import * as vscode from 'vscode';
import opn = require('opn');
import urlRegex = require('url-regex');

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.searchWithCursor', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		opn(getText(editor));
	});

	context.subscriptions.push(disposable);
}

function pickUrl(text: string): string {
	if (urlRegex().test(text)) {
		const url = text.match(urlRegex())!.shift();
		if (url) return url;
	}

	return `https://www.google.com/search?q=${text.trim().replace(/\n+/g, ' ')}`;
}

function getText(editor: vscode.TextEditor): string {
	const selection = editor.selection;
	const text = selection.isEmpty
		? editor.document.lineAt(selection.start.line).text.trim()
		: editor.document.getText(selection).trim();

	return text ? pickUrl(text) : 'https://www.google.com';
}

export function deactivate() {}
