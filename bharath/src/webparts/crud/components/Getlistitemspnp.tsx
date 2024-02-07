// import * as React from 'react';
// import * as sp from "@pnp/sp";
// import { Web } from "@pnp/sp/webs";
// import { IList, IItem } from "@pnp/sp/presets/all";
// // import { IHelloWorldProps } from './IHelloWorldProps';

// export interface IHelloWorldProps{

// }

// export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
//   private getListItems = async () => {
//     try {
//       // Replace 'Your List Name' with the name of your SharePoint list
//       const listName: string = 'Images';

//       const web = new Web(this.props.context.pageContext.web.absoluteUrl);
//       const list: IList = web.lists.getByTitle(listName);
      
//       // Retrieve items from the list
//       const items: IItem[] = await list.items.get();

//       // Log the items to the console (for demonstration purposes)
//       console.log(items);
      
//       // You can now use the 'items' array in your component state or perform any other necessary actions
//     } catch (error) {
//       console.error("Error retrieving list items:", error);
//     }
//   };

//   public componentDidMount() {
//     // Initialize SharePoint PnP JS library
//     sp.setup({
//       spfxContext: this.props.context
//     });

//     // Call the function to get list items
//     this.getListItems();
//   }

//   public render(): React.ReactElement<IHelloWorldProps> {
//     return (
//       <div>
//         {/* Your component UI goes here */}
//       </div>
//     );
//   }
// }
