declare interface IExportToDocCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ExportToDocCommandSetStrings' {
  const strings: IExportToDocCommandSetStrings;
  export = strings;
}
