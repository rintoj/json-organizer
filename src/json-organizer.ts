'use strict';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function toObject(value, i = '  ') {
    let values = [];
    if (typeof value === 'string') {
        return `'${value}'`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
        return `${value}`;
    } else if (value instanceof Array) {
        values = ['[', value.map(v => toObject(v, i)).join(`, `), ']'];
    } else if (typeof value === 'object') {
        values = ['{', Object.keys(value).map(v => `${v}: ${toObject(value[v], i)}`).join(`, `), '}'];
    }
    return values.join('');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('jsono.json-to-object', () => {
        // The code you place here will be executed every time your command is executed

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return; // No open text editor
        }

        var selection = editor.selection;
        var text = editor.document.getText(selection);

        try {
            let target = eval('(' + text + ')');
            let objectStr = toObject(target);
            console.log(target, objectStr);
            editor.edit((edit) => {
                edit.replace(editor.selection, objectStr);
            });
        } catch (e) {

        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}