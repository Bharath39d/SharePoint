import * as React from 'react';
// import styles from './Bharath.module.scss';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
// import type { IBharathProps } from './IBharathProps';

// const siteUrl: string = 'https://4bdfsh.sharepoint.com/sites/BharathD';

interface IListItem {
  Title: string;
  Id: number;
  // Add more fields as needed
}

// interface IBharathProps {
//   context: any; // Adjust the type according to your SPFx version and configuration
// }

interface IBharathState {
  items: IListItem[];
}

export default class Bharath extends React.Component<{}, IBharathState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      items: [],
      // context:new WebPartContext,
    };
  }

  public componentDidMount(): void {
    this.loadListItems();
  }

  private loadListItems(): void {
    // const siteUrl: string = this.props.context.pageContext.web.absoluteUrl;
    const listName: string = "Images"; // Replace with your SharePoint list name

    const endpoint: string = `https://4bdfsh.sharepoint.com/sites/BharathD/_api/web/lists/getbytitle('${listName}')/items`;

    this.props.context.spHttpClient
      .get(endpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error(`Failed to load list items. Error: ${response.statusText}`);
        }
      })
      .then((data: any) => {
        if (data && data.value) {
          this.setState({
            items: data.value,
          });
        }
      })
      .catch((error: any) => {
        console.error('Error fetching list items:', error);
      });
  }

  public render(): React.ReactElement<{}> {
    return (
      <div>
        <h1>List Items</h1>
        <ul>
          {this.state.items.map((item: IListItem) => (
            <li key={item.Id}>{item.Title}</li>
            // Add more fields as needed
          ))}
        </ul>
      </div>
    );
  }
}



