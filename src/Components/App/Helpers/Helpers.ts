import { Item } from "../../../Types/Response.interface"

export  const getFindedElements = (allItems: Item[], inputValue: string) => {
    return allItems.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()))
  }