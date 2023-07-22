import { createSlice } from "@reduxjs/toolkit";

const initialState = { responsive:null };

const responsiveSlice = createSlice({
    name: "responsive",
    initialState,
    reducers : {
        responsivefunction : ()=>{
            if(window.screen.width <= 670 ){
                let container=document.getElementsByClassName('btn-container')[0];
                container.style.display='none';
            }
        },
        responsiveNav : ()=>{
            if(window.screen.width <= 670 ){
                let container=document.getElementsByClassName('nav-buttons')[0];
                container.style.display='none';
                
            }
        }

    }
});

export const { responsivefunction , responsiveNav } = responsiveSlice.actions;
export default responsiveSlice.reducer;
