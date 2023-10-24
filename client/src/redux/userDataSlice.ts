import {createSlice} from '@reduxjs/toolkit'
export const userDataSlice = createSlice(
    {
        name:"userData",
        initialState:{
            id:"",
            name:"",
            email:"",
            isAdmin:false,
            isDoctor:false,
        },
        reducers: {
            storeUser: (state, action) => {
              state.id=action.payload.id;
              state.name = action.payload.name;
              state.email = action.payload.email;
              state.isAdmin = action.payload.isAdmin;
              state.isDoctor = action.payload.isDoctor;
            },
            deleteUser: (state) => {
              state.id="";
              state.name = '';
              state.email = '';
              state.isAdmin = false;
              state.isDoctor = false;  
            },
          },
        
    }
)

export const {storeUser,deleteUser} =userDataSlice.actions