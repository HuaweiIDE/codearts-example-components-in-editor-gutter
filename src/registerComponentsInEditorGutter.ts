/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as codearts from '@codearts/plugin';
import { registerActionViewItem } from './registerActionViewItem';
import { registerDropdownMenu } from './registerDropdownMenu';


export async function registerComponentsInEditorGutter(document: codearts.TextDocument) {
    if (document.uri.scheme !== "file") {
        return;
    }

    const components: Array<codearts.ui.Component> =
        new Array<codearts.ui.Component>();
    await registerActionViewItem(document, components);
    await registerDropdownMenu(document, components);

    // Register dropdownMenuActionViewItems of all visible views(current file path) to editor gutter in batches.
    // (Notes: If this arg of components is an empty array, the components of the filePath will be unregistered.)
    codearts.window.registerComponentsInEditorGutter(
        document.uri.fsPath,
        components
    );

}