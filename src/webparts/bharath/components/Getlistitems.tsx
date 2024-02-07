// import * as React from 'react';
// import { WebPartContext } from '@microsoft/sp-webpart-base';
// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// interface IListItem {
//   Title: string;
//   Description: string;
// }

// interface IGetlistitemsProps {
//   context: WebPartContext;
// }

// debugger;

// const Getlistitems: React.FC<IGetlistitemsProps> = ({ context }) => {
//   const [listItems, setListItems] = React.useState<IListItem[]>([]);

  
//   const loadListItems = () => {
//     const endpoint = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Images')/items?$select=Title,Description`;
//     SPHttpClient.configurations.v1,
//           {
//             headers: {
//               'Accept': 'application/json;odata=nometadata',
//               'Content-type': 'application/json;odata=verbose',
//               'odata-version': ''
//             },
//     context.spHttpClient.get(endpoint, SPHttpClient.configurations.v1)
//       .then((response: SPHttpClientResponse) => response.json())
//       .then((data: any) => {
//         const items: IListItem[] = data.value.map((item: any) => ({
//           Title: item.Title,
//           Description: item.Description,
//         }));
//         console.log("Data "+data);
//         console.log("items "+items);
//         setListItems(items);
//       })
//       .catch((error: any) => {
//         console.error('Error loading list items:', error);
//       });

//       React.useEffect(() => {
//         // Call the function to load list items when the component mounts
//         loadListItems();
//       }, []); // The empty dependency array ensures that this effect runs once, similar to componentDidMount
    
//   };

//   return (
//     <div>
//       <h2>List Items</h2>
//       <ul>
//         {listItems.map((item: IListItem, index: number) => (
//           <li key={index}>
//             <strong>Title:</strong> {item.Title}, <strong>Description:</strong> {item.Description}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };}

// export default Getlistitems;
