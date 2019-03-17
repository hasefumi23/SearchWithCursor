import * as vscode from 'vscode';
import opn = require('opn');

// cf. https://daringfireball.net/2010/07/improved_regex_for_matching_urls
const URL_REGEX: RegExp = /(?:https?:\/\/|localhost|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>\[\]]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>\[\]]+|(\([^\s()<>\[\]]+\)))*\)|[^\s`!(){}\[\];:'".,<>?«»“”‘’])/ig

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.searchWithCursor', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) return;

		opn(getText(editor));
	});

	context.subscriptions.push(disposable);
}

function pickUrl(text: string): string {
	if (URL_REGEX.test(text)) {
		const url = text.match(URL_REGEX)!.shift();
		if (url) return url;
	}

	const encodedText = encodeURIComponent(text.trim().replace(/\n+/g, ' '));
	const searchEngine = vscode.workspace.getConfiguration('searchWithCursor').get('customSearchEngine', 'https://www.google.com/search?q=%s');
	return searchEngine.replace(/%s/g, encodedText);
}

function getText(editor: vscode.TextEditor): string {
	const selection = editor.selection;
	const text = selection.isEmpty
		? editor.document.lineAt(selection.start.line).text.trim()
		: editor.document.getText(selection).trim();

	return text ? pickUrl(text) : 'https://www.google.com';
}

export function deactivate() {}
