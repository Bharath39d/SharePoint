import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGetListItemsSPHttpProps {
  context: WebPartContext;
}

export interface IGetListItemsSPHttpState {
  items: any[];
}

export default class GetListItemsSPHttp extends React.Component<IGetListItemsSPHttpProps, IGetListItemsSPHttpState> {
  constructor(props: IGetListItemsSPHttpProps) {
    super(props);
    this.state = {
      items: []
    };
  }

  public componentDidMount(): void {
    this.getListItems('SampleList', 'Title,Description');
  }

  private getListItems(listName: string, fields: string): void {
    const endpoint: string = this.props.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('${listName}')/items?$select=${fields}`;

    this.props.context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      })
      .then((data: any) => {
        this.setState({
          items: data.value
        });
        console.log("data "+data);
      })
      .catch((error: any) => {
        console.error('Error fetching list items:', error);
      });
  }

  public render(): React.ReactElement<IGetListItemsSPHttpProps> {
    return (
      <div>
        <h2>List Items</h2>
        <ul>
          {this.state.items.map((item: any) => (
            <li key={item.Id}>
              <strong>{item.Title}</strong>: {item.Description}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
