import * as React from 'react';
// import styles from './Listitems.module.scss';
// import { IListitemsProps } from './IListitemsProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IListitemsProps {
    spHttpClient: SPHttpClient; // An instance of SPHttpClient for making HTTP requests to SharePoint.
    // siteUrl: string ; // The URL of the SharePoint site.
    // listName: string; // The name of the SharePoint list from which to fetch items.
  }

export interface IListItem {
  Title: string;
  ID: number;
}

// debugger;

const Listitems: React.FC<IListitemsProps> = ({ spHttpClient }) => {
  const [listItems, setListItems] = React.useState<IListItem[]>([]);

  const loadListItems = () => {
    const endpoint = `https://4bdfsh.sharepoint.com/sites/BharathD/_api/web/lists/getbytitle('Images')/items?$select=Title,ID`;
    // const endpoint = `${siteUrl}/_api/web/lists/getbytitle('Images')/items?$select=Title,ID`;

    spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => response.json())
      .then((data: any) => {
        const items: IListItem[] = data.value.map((item: any) => ({
          Title: item.Title,
          ID: item.ID
        }));
        console.log("Data "+data);
        setListItems(items);
        console.log("List Items :"+listItems);
      })
      .catch((error: any) => {
        console.error('Error loading list items:', error);
      });    

}  

  React.useEffect(() => {
    loadListItems();
  }, []); // Run only on mount

  
  return (
    <div>
      <h2>List Items</h2>
      <ul>
        {listItems.map((item: IListItem) => (
          <li key={item.ID}>{item.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Listitems;