/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as codearts from '@codearts/plugin';

export async function registerActionViewItem(document: codearts.TextDocument, components: Array<codearts.ui.Component>) {
    // Create actionViewItem
    const lineNumber = 2;
    const action = {
        id: `favorited-${Math.random()
            .toString(18)
            .slice(2, 15)}-${new Date().getTime()}`,
        label: "Favorited",
        class: "codicon codicon-favorited",
        enabled: true,
        tooltip: "",
        lineNumber: lineNumber,
    };
    const options: codearts.ui.ActionViewItemOptions = {
        icon: true,
        label: false,
    };
    const actionViewItem = await codearts.ui.actionViewItem.create(
        action,
        options
    );

    // Add onClick event listener of actionViewItem
    actionViewItem.onClick(async () => {
        codearts.window.showInformationMessage("click " + action.label);
    });

    components.push(actionViewItem);
}
