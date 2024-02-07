import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { PrimaryButton, TextField } from 'office-ui-fabric-react';

export default class ListOperations extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      newItemTitle: '',
      newItemDescription: ''
    };
  }

  componentDidMount() {
    // Load existing items when the component mounts
    this.loadItems();
  }

  loadItems() {
    const { context } = this.props;
    const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Images')/items?$select=Title,Description`;

    context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => response.json())
      .then((data: any) => {
        this.setState({ items: data.value });
      })
      .catch((error: any) => {
        console.error('Error loading list items:', error);
      });
  }

  createItem() {
    const { context } = this.props;
    const { newItemTitle, newItemDescription } = this.state;

    const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Images')/items`;

    const headers: HeadersInit = new Headers();
    headers.append('Content-type', 'application/json;odata=verbose');
    const options: any = {
      headers: headers,
      body: JSON.stringify({
        Title: newItemTitle,
        Description: newItemDescription
      })
    };

    context.spHttpClient.post(endpoint, SPHttpClient.configurations.v1, options)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          // Item created successfully, reload the items
          this.loadItems();
        } else {
          console.error('Error creating list item:', response.statusText);
        }
      })
      .catch((error: any) => {
        console.error('Error creating list item:', error);
      });
  }

  updateItem(itemId: number, updatedTitle: string, updatedDescription: string) {
    const { context } = this.props;
    const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Images')/items(${itemId})`;

    const headers: HeadersInit = new Headers();
    headers.append('Content-type', 'application/json;odata=verbose');
    const options: any = {
      headers: headers,
      body: JSON.stringify({
        Title: updatedTitle,
        Description: updatedDescription
      }),
      method: 'PATCH'
    };

    context.spHttpClient.fetch(endpoint, SPHttpClient.configurations.v1, options)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          // Item updated successfully, reload the items
          this.loadItems();
        } else {
          console.error('Error updating list item:', response.statusText);
        }
      })
      .catch((error: any) => {
        console.error('Error updating list item:', error);
      });
  }

  deleteItem(itemId: number) {
    const { context } = this.props;
    const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Images')/items(${itemId})`;

    const options: any = {
      method: 'DELETE'
    };

    context.spHttpClient.fetch(endpoint, SPHttpClient.configurations.v1, options)
      .then((response: SPHttpClientResponse) => {
        if (response.ok) {
          // Item deleted successfully, reload the items
          this.loadItems();
        } else {
          console.error('Error deleting list item:', response.statusText);
        }
      })
      .catch((error: any) => {
        console.error('Error deleting list item:', error);
      });
  }

  handleTitleChange = (event: any) => {
    this.setState({ newItemTitle: event.target.value });
  }

  handleDescriptionChange = (event: any) => {
    this.setState({ newItemDescription: event.target.value });
  }

  render() {
    const { items, newItemTitle, newItemDescription } = this.state;

    return (
      <div>
        <h1>List Operations</h1>
        <ul>
          {items.map((item: any) => (
            <li key={item.Id}>
              <strong>{item.Title}</strong> - {item.Description}
              <button onClick={() => this.updateItem(item.Id, 'Updated Title', 'Updated Description')}>Update</button>
              <button onClick={() => this.deleteItem(item.Id)}>Delete</button>
            </li>
          ))}
        </ul>
        <h2>Create New Item</h2>
        <TextField label="Title" value={newItemTitle} onChange={this.handleTitleChange} />
        <TextField label="Description" value={newItemDescription} onChange={this.handleDescriptionChange} />
        <PrimaryButton onClick={() => this.createItem()}>Create</PrimaryButton>
      </div>
    );
  }
}
