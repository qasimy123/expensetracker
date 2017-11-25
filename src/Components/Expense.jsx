import React, {Component} from "react";
import moment from "moment";
import {connect} from "react-redux";
import {removeExpense} from "../actions"
import {Glyphicon} from "react-bootstrap"
import "../index.css"

class Expense extends Component{
    
    removeExpense(id){
        console.log('hella',id)
        this.props.removeExpense(id);
    
    }
    
    render(){
        const {expense,id,icons}=this.props;
        
        return(
            
            
               <li key={id} className="list-group-item">
              
               <div style={{display:"block",height:"50px",position:"relative"}} className="list-item">
                
               <div style={{color:"#e64c65"}}><span style={{fontWeight:"bold"}}>-${expense.amount}</span></div>
               Category: <Glyphicon glyph={icons[expense.category]}/>
               
               <div><em>{moment().startOf('month').format("YYYY-MM-DD")!==moment(expense.date).startOf('month').format("YYYY-MM-DD")?this.removeExpense(id): moment(expense.date).format('LL')}</em></div>
               <div  onClick={()=>{this.removeExpense(id)}} style={{right:"15px",top:"15px",position:"absolute"}}><Glyphicon className="list-remove" glyph="remove" /> </div>
               </div>
              
               </li>
              
               
            )
        
    }
}

function mapStateToProps(state){
    
    return{
        expenses:state
        
    }
}

export default connect(mapStateToProps,{removeExpense})(Expense)