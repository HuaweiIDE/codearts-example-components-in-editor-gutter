/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as codearts from '@codearts/plugin';
import { registerComponentsInEditorGutter } from "./registerComponentsInEditorGutter";

export class ComponentsSettings {
    public context: codearts.ExtensionContext | undefined;

    public async initRegisterComponents(
        context: codearts.ExtensionContext
    ): Promise<void> {
        this.context = context;
        await this.registerComponentsListener(this.context);
        await this.registerComponents();
    }

    private async registerComponentsListener(context: codearts.ExtensionContext) {
        context.subscriptions.push(
            codearts.workspace.onDidSaveTextDocument(async (document: any) => {
                if (!document) {
                    return;
                }
                await registerComponentsInEditorGutter(document);
            })
        );
        context.subscriptions.push(
            codearts.window.onDidChangeTextEditorSelection(async (event: { textEditor: { document: any; }; }) => {
                if (!event) {
                    return;
                }
                await registerComponentsInEditorGutter(event.textEditor.document);
            })
        );
        context.subscriptions.push(
            codearts.workspace.onDidOpenTextDocument(async (document: any) => {
                if (!document) {
                    return;
                }
                await registerComponentsInEditorGutter(document);
            })
        );
        context.subscriptions.push(
            codearts.window.onDidChangeActiveTextEditor(async (editor: any) => {
                if (!editor) {
                    return;
                }
                await registerComponentsInEditorGutter(editor.document);
            })
        );
    }

    private async registerComponents() {
        const editor = codearts.window.activeTextEditor;
        if (editor?.document.fileName) {
            await registerComponentsInEditorGutter(editor.document);
        }
    }
}

export const componentsSettings: ComponentsSettings =
    new ComponentsSettings();
