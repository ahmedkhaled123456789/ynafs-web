import {  toast } from 'react-toastify';

import {createSlice} from '@reduxjs/toolkit';

const items = localStorage.getItem("items") !== null  ? JSON.parse(localStorage.getItem("items")) : [];
const totalQty = localStorage.getItem("totalQuantity") !== null  ? JSON.parse(localStorage.getItem("totalQuantity")) :0;
// const favLoading = localStorage.getItem("loading") !== null  ?  (localStorage.getItem("loading")) :false;

const initialState={
    items,
    totalQuantity: totalQty,
    loading:false,

}
const favProductSlice = createSlice({
    name: 'favProduct',
    initialState,
    reducers:{
        addProductFav:(state,action) =>{
 const newItem = action.payload;
   const existingItems = state.items.find(item => item.id === newItem.id);
   console.log(newItem)
  if(!existingItems){ 
    state.items.push({
        id: newItem.id,
        price: newItem.newprice,
        beforePrice: newItem.beforePrice,
        title: newItem.title,
           image: newItem.image,
       })
       toast.success("New Product added to Fav");
       state.totalQuantity = state.items.length;
       localStorage.setItem("items", JSON.stringify(state.items.map((item) => item)));
          localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
          localStorage.setItem("loading", JSON.stringify(state.loading));
          state.loading=false;

  }else{
    state.loading=true;

   const deleteItem=  state.items.filter((item) => item.id !== newItem.id);
   state.items =  deleteItem ;
      toast.success("Product deleted");
     state.totalQuantity = state.items.length;
     localStorage.setItem("items", JSON.stringify(state.items.map((item) => item)));
     localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
 
   }
   }, 
   emptyAllProuducts:(state,action) =>{

    state.items=[];
    state.totalQuantity = state.items.length;
    localStorage.setItem("items", JSON.stringify(state.items.map((item) => item)));
    localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
  },
  deleteProductFav:(state,action) =>{
    const id =action.payload;
    state.items=state.items.filter((item) => item.id !== id);
    toast.success("Product deleted");
    state.totalQuantity = state.items.length;
    localStorage.setItem("items", JSON.stringify(state.items.map((item) => item)));
    localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
  },
    },
}); 

export const  {addProductFav,emptyAllProuducts,deleteProductFav} = favProductSlice.actions;
export default favProductSlice.reducer;