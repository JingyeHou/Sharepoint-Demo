import { override } from '@microsoft/decorators';
import { Log, Guid } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';
const pdftronUrl = 'http://localhost:3000'

import * as strings from 'ExportToDocCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IExportToDocCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'ExportToDocCommandSet';

export default class ExportToDocCommandSet extends BaseListViewCommandSet<IExportToDocCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized ExportToDocCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    console.log(this)
    const compareOneCommand: Command = this.tryGetCommand('OPEN_IN_PDFTRON');
    const commandTwo: Command = this.tryGetCommand('MERGE');
    
    if (compareOneCommand) {
      // This command should be hidden unless exactly one row is selected.
      compareOneCommand.visible = event.selectedRows.length === 1;
    }
    if (commandTwo) {
      commandTwo.visible = event.selectedRows.length > 1 
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    const fileRef = event.selectedRows[0].getValueByName('FileRef');
    const fileName = event.selectedRows[0].getValueByName('FileLeafRef');
    const serverRelativeUrl = this.context.pageContext.web.serverRelativeUrl;
    const folederName = fileRef.match(`(?<=${serverRelativeUrl}\/)(.*?)(?=\/${fileName})`)[1] 
   
    switch (event.itemId) {
      case 'OPEN_IN_PDFTRON':
        window.open(`${pdftronUrl}?filename=${fileName}&foldername=${folederName}&username=${this.context.pageContext.user.displayName}`)
        break;
      case 'MERGE':
        console.log('MERGE', event.selectedRows)
      default:
        throw new Error('Unknown command');
    }
  }
}
