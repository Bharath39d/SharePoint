import * as React from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";


// get all the items from a list
const items = sp.web.lists.getByTitle("MyTestList").items();
console.log(items);

// use odata operators for more efficient queries
const items2= sp.web.lists.getByTitle("MyTestList").items.select("Title", "Description").top(5).orderBy("Modified", true)();
console.log(items2);

function Getlistitems() {
  return (
    <div>
        <h1>List Items :</h1>
        <div>{items}</div>
    </div>
  )
}

export default Getlistitems