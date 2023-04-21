/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module "@codearts/plugin" {
    export namespace window {
        /**
         * Register components to editor gutter in batches
         * @param filePath File path of document where components are registered.
         * (Notes:
         * 		The value of this arg should be the same with 'editor.document.uri.fsPath'.)
         * @param components Components to be registered in batches.
         * (Notes:
         * 		1. The array stores components in different positions of the filePath.
         *		2. If this arg is an empty array, the components of the filePath will be unregistered.
         *		3. If this arg is not an empty array, all components of the filePath that have been registered last time will be unregistered and replaced by components that are going to be registered this time.)
         * @return Disposable which unregisters this command on disposal.
         */
        export function registerComponentsInEditorGutter(
            filePath: string,
            components: ui.Component[]
        ): Disposable;
    }

    /**
     * Namespace for ui controls.
     */
    export namespace ui {
        /**
         * ActionViewItem Control.
         */
        export interface Component {
            /**
             * The unique id of control.
             */
            id: string;

            /**
             * The frontend module name corresponding to this control.
             */
            ideuiModule: string;

            /**
             * Dispose the control, and the module created by the frontend in browser will also be disposed together.
             */
            dispose(): void;

            /**
             * Fired when the control is mounted in front-end dom.
             */
            onConnected: Event<void>;

            /**
             * Fired when the control is unmounted in front-end dom.
             */
            onDisconnected: Event<void>;

            /**
             * Listen for events, the `eventType` here can only support the event type that the control encapsulates in the `mainthread`.
             */
            on(eventType: string, eventhandler: (eventData: unknown) => void): void;
        }

        export interface ActionViewItem extends Component {
            /**
             * The unique id of ActionViewItem control.
             */
            id: string;

            /**
             * Action parameters.
             */
            action: ActionOptions;

            /**
             * Configuration parameters of the ActionViewItem component.
             */
            options: ActionViewItemOptions;

            /**
             * Callback when a ActionViewItem is clicked.
             */
            onClick: Event<void>;

            /**
             * Render an html element from the action view item element.
             */
            render(): void;

            /**
             * Focus the current item element.
             */
            focus(): void;

            /**
             * 	Determine whether the current element is focused.
             */
            isFocused(): boolean;

            /**
             * Blur the current item element.
             */
            blur(): void;

            /**
             * Event for modifying item focusable when dot is set.
             */
            setFocusable(): void;

            /**
             * Update the class of the current item.
             */
            updateClass(): void;

            /**
             * Update the label of the current item.
             */
            updateLabel(): void;

            /**
             * Update the tooltip of the current item.
             */
            updateTooltip(): void;

            /**
             * Destroy the component.
             */
            dispose(): void;

            /**
             * Obtains the order of the current component.
             */
            order(): number;
        }

        export interface BaseActionViewItemOptions {
            /**
             * Is it possible to drag.
             */
            draggable?: boolean;

            /**
             * Is it the menu.
             */
            isMenu?: boolean;
        }

        /**
         * Configuration parameters of the ActionViewItem component.
         */
        export interface ActionViewItemOptions extends BaseActionViewItemOptions {
            /**
             * Display icon.
             */
            icon?: boolean;

            /**
             * Display label.
             */
            label?: boolean;

            /**
             * Shortcut Keys.
             */
            keybinding?: string | null;

            /**
             * Indicates whether to display or hide the component. If the value is true, the component cannot be hidden.
             */
            alwaysVisible?: boolean;

            /**
             * Vertical or horizontal mode.
             */
            verticalMode?: boolean;
        }

        /**
         * Action parameters.
         */
        export interface ActionOptions {
            /**
             * Action Id.
             */
            readonly id: string;

            /**
             * Contents displayed on the ActionViewItem.
             */
            label: string;

            /**
             *  Text displayed when you slide the mouse over the ActionViewItem.
             */
            tooltip: string;

            /**
             * Sets the class name of the icon, eg. `codicon codicon-add`.
             */
            class: string | undefined;

            /**
             * Sets the ActionViewItem invalid status.
             */
            enabled: boolean;

            /**
             * Is it selected.
             */
            checked?: boolean;

            /**
             * Order to insert into the actionbar
             */
            order?: number;
        }

        /**
         * Namespace for actionViewItem.
         */
        export namespace actionViewItem {
            /**
             * @param action Action parameters required for creating a actionViewItem component.
             * @param options Configuration parameters of the ActionViewItem component.
             * @returns A promise that resolves to `actionViewItem` when the actionViewItem component is created.
             */
            export function create(
                action: ActionOptions,
                options: ActionViewItemOptions
            ): Thenable<ActionViewItem>;
        }

        /**
         * DropdownMenuActionViewItem Control.
         */
        export interface DropdownMenuActionViewItem extends Component {
            /**
             * The unique id of DropdownMenuActionViewItem control.
             */
            id: string;

            /**
             * Action parameters.
             */
            action: DropdownMenuInEditorOptions;

            /**
             * Menu action parameters.
             */
            menuActions: ActionViewItemAsDropdownMenuItemOptions[];

            /**
             * Render an html element from the dropdownMenuActionViewItem element.
             */
            render(): void;

            /**
             * Focus the current item element.
             */
            focus(): void;

            /**
             * 	Determine whether the current element is focused.
             */
            isFocused(): boolean;

            /**
             * Blur the current item element.
             */
            blur(): void;

            /**
             * Event for modifying item focusable when dot is set.
             */
            setFocusable(): void;

            /**
             * Update the class of the current item.
             */
            updateClass(): void;

            /**
             * Update the label of the current item.
             */
            updateLabel(): void;

            /**
             * Update the tooltip of the current item.
             */
            updateTooltip(): void;

            /**
             * Destroy the component.
             */
            dispose(): void;
        }

        /**
         * Parameters required for creating a DropdownMenuActionViewItem component.
         */
        export interface DropdownMenuInEditorOptions {
            /**
             * Action Id.
             */
            id?: string;

            /**
             * Contents displayed on the DropdownMenuActionViewItem.
             */
            label: string;

            /**
             * Text displayed when you slide the mouse over the DropdownMenuActionViewItem.
             */
            tooltip: string;

            /**
             * Set the class name of the icon, eg. `codicon codicon-add`.
             */
            class: string | undefined;

            /**
             * Set the DropdownMenuActionViewItem invalid status.
             */
            enabled?: boolean;

            /**
             * Is it selected.
             */
            checked?: boolean;

            /**
             * Order to insert into the actionbar.
             */
            order?: number;

            /**
             * line number of the editor.
             */
            lineNumber?: number;
        }

        /**
         * Infomation of the custom dropdown menu item component, eg. actionViewItem.
         */
        export interface ActionViewItemAsDropdownMenuItemOptions {
            /**
             * ActionViewItem Id.
             */
            actionViewItemId: string;
        }

        /**
         * Namespace for dropdownMenuActionViewItem.
         */
        export namespace dropdownMenuActionViewItem {
            /**
             *
             * @param action Action parameters required for creating a dropdownMenuActionViewItem component.
             * @param actionViewItemAsDropdownMenuItemOptions Configuration parameters of the custom dropdown menu item component.
             * @returns A promise that resolves to `dropdownMenuActionViewItem` when the dropdownMenuActionViewItem component is created.
             */
            export function create(
                action: ui.DropdownMenuInEditorOptions,
                actionViewItemAsDropdownMenuItemOptions: ui.ActionViewItemAsDropdownMenuItemOptions[]
            ): Thenable<DropdownMenuActionViewItem>;
        }
    }
}
