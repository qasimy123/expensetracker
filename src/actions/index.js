import {ADD_EXPENSE,REMOVE_EXPENSE} from "../constants";

export const addExpense=(amount,date,category) =>{
    
    
    const action={
        type:ADD_EXPENSE,
        amount,
        date,
        category
    }
    
    console.log("Actions",action);
    return action;
    
}

export const removeExpense=(id) =>{
    const action={
        type:REMOVE_EXPENSE,
        id
    }
    return action;
}
