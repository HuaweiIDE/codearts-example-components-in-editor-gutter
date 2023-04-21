/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Huawei Technologies Co., Ltd. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as codearts from '@codearts/plugin';
import { Plugin } from '@codearts/core/lib/node/plugin-api';
import { componentsSettings } from './componentsSettings';

/**
 * Plugin activation entry point, this function is called when plugin is loaded.
 */
export async function start(context: codearts.ExtensionContext) {
    await componentsSettings.initRegisterComponents(context);
}

/**
 * The method that is called when the plugin is stopped. 
 * If you need to customize the clean-up action that the plug-in stops, you can add it to the method.
 */
export function stop(context: codearts.ExtensionContext) {
    Plugin.getInstance().stop();
}
