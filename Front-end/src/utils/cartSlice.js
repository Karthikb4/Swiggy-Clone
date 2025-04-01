import { createSlice, current } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    name: "cart",
    initialState:{
        items:[],
    },
    reducers:{
        addItem: (state,action)=>{
            state.items.push(action.payload);
        },
        removeItem:(state)=>{
            state.items.pop();
        },
        emptyCart:(state)=>{
            // console.log(current(state));
            // state=[];
            state.items.length=0;
        },
    },
});

// console.log(cartSlice);

export const {addItem,removeItem,emptyCart}=cartSlice.actions;

export default cartSlice.reducer;  
