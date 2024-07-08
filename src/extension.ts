'use strict';

import * as vscode_rpc from 'vscode-jsonrpc';
import * as vscode from 'vscode';
import * as vscode_lc from 'vscode-languageclient/node';

let languageClient: vscode_lc.LanguageClient;

export function activate(context: vscode.ExtensionContext) {
	const exe: vscode_lc.Executable = {
        command: "c:/Users/algonz/repo/goptos/lsp/main.exe",
        transport: vscode_lc.TransportKind.stdio
    }
    const serverOptions: vscode_lc.ServerOptions = {
		run: exe,
		debug: exe
    }
    let clientOptions: vscode_lc.LanguageClientOptions = {
        documentSelector: ['go'],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.go')
        }
    }
    languageClient = new vscode_lc.LanguageClient('Goptos', serverOptions, clientOptions);
    languageClient.setTrace(vscode_rpc.Trace.Verbose);
    languageClient.start();
}

export function deactivate() {
    return languageClient.stop();
}