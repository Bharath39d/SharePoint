import { SPHttpClient } from '@microsoft/sp-http'; 

export interface IProjectProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;

  listName: string;  
  spHttpClient: SPHttpClient;
  siteUrl: string; 
} 
