/** *******************************************************************************************************************
  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License").
  You may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ******************************************************************************************************************** */
import { LOCAL_STORAGE_KEY_CURRENT_WORKSPACE, Workspace } from '@aws/threat-composer';
import { generatePath, redirect } from 'react-router-dom';
import { ROUTE_WORKSPACE_DEFAULT, ROUTE_WORKSPACE_PATH } from '../config/routes';

const initialWorkspaceLoader = async () => {
  const currentWorkspaceValue = window.localStorage.getItem(LOCAL_STORAGE_KEY_CURRENT_WORKSPACE);

  if (currentWorkspaceValue) {
    try {
      const currentWorkspace = JSON.parse(currentWorkspaceValue) as Workspace | null | undefined;
      if (currentWorkspace) {
        const redirectUrl = generatePath(ROUTE_WORKSPACE_PATH, {
          workspaceId: currentWorkspace.name,
        });
        return redirect(redirectUrl);
      }

    } catch (e) {
      console.log('Error in retrieving current workspace', currentWorkspaceValue);
    }
  }

  return redirect(ROUTE_WORKSPACE_DEFAULT);
};

export default initialWorkspaceLoader;