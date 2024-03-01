import React, { useContext } from "react"
import { DataContext } from "../../Store/Store.ts";


export const Items = () => {
    const {itemsAsJSX} = useContext(DataContext)

    console.log("itemsAsJSX :", itemsAsJSX);
    
    return <div>Items</div>
}