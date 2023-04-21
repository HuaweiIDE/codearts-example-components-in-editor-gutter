/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as codearts from '@codearts/plugin';

export async function registerDropdownMenu(document: codearts.TextDocument, components: Array<codearts.ui.Component>) {
    // Create dropdown menu item
    const runDebugItemName = "test-main-class";
    const runActionMenuItem = {
        id: `run-${Math.random()
            .toString(18)
            .slice(2, 15)}-${new Date().getTime()}`,
        label: "Run " + runDebugItemName,
        class: "",
        enabled: true,
        tooltip: "",
    };

    const debugActionMenuItem = {
        id: `debug-${Math.random()
            .toString(18)
            .slice(2, 15)}-${new Date().getTime()}`,
        label: "Debug " + runDebugItemName,
        class: "",
        enabled: true,
        tooltip: "",
    };

    const menuItemOptions: codearts.ui.ActionViewItemOptions = {
        icon: false,
        label: true,
        isMenu: true, // AvtionViewItem as menu item shoud set isMenu true.
    };

    const runMenuActionViewItem = await codearts.ui.actionViewItem.create(
        runActionMenuItem,
        menuItemOptions
    );
    const debugMenuActionViewItem = await codearts.ui.actionViewItem.create(
        debugActionMenuItem,
        menuItemOptions
    );

    // Add onClick event listener of menu item
    runMenuActionViewItem.onClick(async () => {
        codearts.window.showInformationMessage("click " + runActionMenuItem.label);
    });
    debugMenuActionViewItem.onClick(async () => {
        codearts.window.showInformationMessage("click " + debugActionMenuItem.label);
    });

    // Create dropdown menu
    const lineNumber: number = 3;
    const menuActions: codearts.ui.ActionViewItemAsDropdownMenuItemOptions[] = [
        {
            actionViewItemId: runMenuActionViewItem.id,
        },
        {
            actionViewItemId: debugMenuActionViewItem.id,
        },
    ];
    const dropdownMenuAction: codearts.ui.DropdownMenuInEditorOptions = {
        label: "Run / Debug",
        class: "codicon-debug-start",
        tooltip: "Debug main",
        lineNumber: lineNumber,
    };
    const dropdownMenuActionViewItem =
        await codearts.ui.dropdownMenuActionViewItem.create(
            dropdownMenuAction,
            menuActions
        );

    components.push(dropdownMenuActionViewItem);
}