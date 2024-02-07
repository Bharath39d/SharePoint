declare interface IProjectWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  ListNameFieldLabel: string;
}

declare module 'ProjectWebPartStrings' {
  const strings: IProjectWebPartStrings;
  export = strings;
}
