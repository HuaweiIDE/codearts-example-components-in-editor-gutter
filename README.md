# codearts-example-view-title-action README

## Features

This example demonstrates how to use the registerComponentsInEditorGutter API. This includes:

- Register actionViewItems in the gutter of the editing area.
- Register dropdownMenus in the gutter of the editing area.

## APIs

- codearts.ui.actionViewItem.create(action, options)

    ```typescript
    // Create actionViewItem
    const lineNumber = 1;
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
    ```

- codearts.ui.dropdownMenuActionViewItem.create(dropdownMenuAction, menuActions)

    ```typescript
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
    const lineNumber: number = 2;
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
    ```

- codearts.window.registerComponentsInEditorGutter(filePath, components);
    ```typescript
    // Register dropdownMenuActionViewItems of all visible views(current file path) to editor gutter in batches.
    // (Notes: If this arg of components is an empty array, the     components of the filePath will be unregistered.)
    codearts.window.registerComponentsInEditorGutter(
        document.uri.fsPath,
        components
    );
    ```
## Effect

![image](https://bbs-img.huaweicloud.com/blogs/img/20230322/1679472199472739648.png)

