

import {ADD_EXPENSE,REMOVE_EXPENSE} from "../constants";
import {bake_cookie,read_cookie} from "sfcookies";

const expense=(action)=>{
    return {
        amount:action.amount,
        date:action.date,
        category:action.category,
        id:Math.random()
        
        
    }
    
}
const removebyId=(state,id)=>{
    const expenses = state.filter((e)=>{
        return e.id!==id
    })
    //console.log('hello',id)
    return expenses;
    }


const expenses =(state=[], action)=>{
    let expenses =null;
    state = read_cookie("expenses");
    switch (action.type) {
        case ADD_EXPENSE:
            expenses=[...state,expense(action)];
            //console.log(expenses);
            bake_cookie('expenses',expenses);
            return expenses;
        
        case REMOVE_EXPENSE:
            expenses=removebyId(state,action.id);
            //console.log(expenses);
            bake_cookie('expenses',expenses);
            return expenses;
            
       
        default:return state;
    
    
}
}
export default expenses;