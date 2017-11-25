import React, {Component} from "react";
import {connect} from "react-redux";
import Expense from "./Expense.jsx";
import {addExpense} from "../actions";
import moment from "moment";
import { bake_cookie, read_cookie } from "sfcookies";
import PieChart from "react-svg-piechart"
import {
    DropdownButton,
    ToggleButton,
    ToggleButtonGroup,
    Collapse,
    Label,
    ButtonToolbar,
    Button,
    FormControl,
    FormGroup,
    InputGroup,
    Form,
    Glyphicon
} from "react-bootstrap";


class App extends Component {
    constructor(props) {
        super(props);
        this.categories=["Entertainment","Education","Personal Care","Health & Fitness","Food & Dining","Travel","Shopping","Home","MISC"];
        this.icons=['film', "pencil", "leaf", "heart", "glass", "plane", "shopping-cart", "home", "star"]
        
        this.state = {

            monthlyIncome:  0,
            expense: 0,
            category: null,
            date: moment().format(),
            buttonSelect: false,
            title:"Select a category",
            expandedSector: null,


        }
        
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this)
    }


    componentDidMount(){
        
        read_cookie('monthlyIncome').length? this.setState({monthlyIncome:read_cookie("monthlyIncome")}):this.setState({open1:!this.state.open1})
      
    }
    addExpense() {
        bake_cookie('monthlyIncome', this.state.monthlyIncome);
        if (this.state.date === "") {
            this.setState({
                date: moment().format()
            })

            this.props.addExpense(this.state.expense, this.state.date, this.state.category);
            this.addTotal();
        } else {
            this.props.addExpense(this.state.expense, this.state.date, this.state.category);
            this.addTotal();
        }


    }


    addTotal() {
        console.log("expenses", this.props.expenses)

    }


    renderExpenses() {
       
        const {
            expenses
        } = this.props;
        
         const data = [
            {label: "Entertainment", value:!expenses.filter((a)=>{return a.category==0}).length?0: expenses.filter((a)=>{return a.category==0}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount , color: "#104476"},
            {label: "Education", value:!expenses.filter((a)=>{return a.category==1}).length?0: expenses.filter((a)=>{return a.category==1}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#50c878"},
            {label: "Personal Care", value:!expenses.filter((a)=>{return a.category==2}).length?0: expenses.filter((a)=>{return a.category==2}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#8EC100"},
            {label: "Health & Fitness", value:!expenses.filter((a)=>{return a.category==3}).length?0: expenses.filter((a)=>{return a.category==3}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#c320cb"},
            {label: "Food & Dining", value:!expenses.filter((a)=>{return a.category==4}).length?0: expenses.filter((a)=>{return a.category==4}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#F8DF5F"},
            {label: "Travel", value:!expenses.filter((a)=>{return a.category==5}).length?0: expenses.filter((a)=>{return a.category==5}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#7DA1BF"},
            {label: "Shopping", value:!expenses.filter((a)=>{return a.category==6}).length?0: expenses.filter((a)=>{return a.category==6}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#765aa8"},
            {label: "Home", value:!expenses.filter((a)=>{return a.category==7}).length?0: expenses.filter((a)=>{return a.category==7}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#cb5e38"},
            {label: "Misc", value:!expenses.filter((a)=>{return a.category==8}).length?0: expenses.filter((a)=>{return a.category==8}).reduce((a,b)=>{
                
                return {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                
            }).amount, color: "#fa30e6"}
        ]

        const {expandedSector} = this.state
        
        return (
            <div>
            
            
           
            <div>Remaining Balance: ${expenses.length?this.state.monthlyIncome-expenses.reduce((a,b)=>(
                    {amount: parseFloat(a.amount)+parseFloat(b.amount)}
                )
            ).amount:this.state.monthlyIncome}</div>
        <div>This month's total spending: ${expenses.length?expenses.reduce((a,b)=>({amount: parseFloat(a.amount)+parseFloat(b.amount)})).amount:0}</div>
        <br/>
          <Label>Add an expense</Label>
          <br/>
         
         
         <ButtonToolbar>
         
         <DropdownButton bsSize="large" title={this.state.title} id="dropdown-size-large">
        <ToggleButtonGroup onClick={event=>{this.setState({category:event.target.value,title:<div><Glyphicon glyph={this.icons[event.target.value]} />{" "}<span>{this.categories[event.target.value]}</span></div>})}}type="radio" name="options" >
        <ToggleButton value={0}><Glyphicon glyph="film" /> Entertainment
        </ToggleButton>
        <ToggleButton value={1}><Glyphicon glyph="pencil" /> Education</ToggleButton>
        <ToggleButton value={2}><Glyphicon glyph="leaf" /> Personal Care</ToggleButton>
        <ToggleButton value={3}><Glyphicon glyph="heart" /> Health & Fitness</ToggleButton>
        <ToggleButton value={4}><Glyphicon glyph="glass" /> Food & Dining</ToggleButton>
        <ToggleButton value={5}><Glyphicon glyph="plane" /> Travel</ToggleButton>
        <ToggleButton value={6}><Glyphicon glyph="shopping-cart" /> Shopping</ToggleButton>
        <ToggleButton value={7}><Glyphicon glyph="home" /> Home</ToggleButton>
        <ToggleButton value={8}><Glyphicon glyph="star" /> Misc</ToggleButton>
        
      </ToggleButtonGroup>
      </DropdownButton>
         
     
      
    </ButtonToolbar>
         <br/>
        <Form inline>
        
         
        
            <FormGroup >
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl placeholder="Add an expense" type="number" min="1" onChange={event=>this.setState({expense:event.target.value})} />
              </InputGroup>
            </FormGroup>
            {" "}
            <FormGroup>
                  <FormControl min={moment().startOf('month').format("YYYY-MM-DD")} max={moment().endOf('month').format("YYYY-MM-DD")} type="date"  onChange={event=>this.setState({date:event.target.value})}/>
            </FormGroup>
        
                <Button type="button" onClick={()=>this.addExpense()}>Submit</Button>
        </Form>
       <br/>
       <div className="card" style={{margin:"20px",width:"350px",textAlign:"center"}}>  
        <PieChart
                    data={ data }
                    expandedSector={expandedSector}
                    onSectorHover={this.handleMouseEnterOnSector}
                    sectorStrokeWidth={2}
                    expandOnHover
                    shrinkOnTouchEnd
                />
                <div className="card-body ">
                {
                    data.sort((a,b)=>{
                        return b.value-a.value
                    }).filter((a)=>{return a.value>0 }).map((element, i) => (
                        <div key={i}>
                            <span className="badge" style={{background: element.color}}>#{i+1}{" "}  
                            <span style={{fontWeight: this.state.expandedSector === i ? "bold" : null}}>
                                {element.label} : ${element.value}
                            </span>
                            </span>
                        </div>
                    ))
                }
                <br/>
                </div>
                
          </div>
          <br/>
        <div style={{display:"block",height:"50px",position:"relative"}} className="well">
        <div style={{marginLeft:"40px"}}>Show {expenses.length==1?"the only":"all"} {expenses.length==1?null:expenses.length}  transaction{expenses.length==1?null:"s"}</div>
        <div   onClick={() => this.setState({ open: !this.state.open })} className="pull-left text-muted" style={{top:"18px",position:"absolute"}}><a><Glyphicon glyph={this.state.open? "minus":"plus"} /></a></div>
        </div>
        
    <Collapse in={this.state.open}>
           <ul className="list-group col-md-6">
           {
           expenses.map((expense)=>{
               
               return(
               <Expense expense={expense} updateExpense={this.updateExpense} icons={this.icons} id={expense.id}/>
               )
               
           })
               
           }
           </ul>
          </Collapse>
          
          
           </div>

        )
    }


    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }
    render() {

        return (
            <div>
        <h1 style={{textAlign:"center"}}>Finance Tracker</h1>
        <div style={{textAlign:"center"}}>{moment().format("MMMM YYYY")}</div>
       
       <br/>
        <div style={{}}className="col-md-8">
        <div>Monthly Income: <a onClick={() => this.setState({ open1: !this.state.open1 })} >${this.state.monthlyIncome}</a></div>
   
 <Collapse  in={this.state.open1}>
 
           <FormGroup >
          
          <InputGroup>
         <InputGroup.Addon>$</InputGroup.Addon>
        <FormControl placeholder="enter your monthly income" type="number" onChange={event=>this.setState({monthlyIncome:event.target.value})} />
         <InputGroup.Addon>.00</InputGroup.Addon>
          </InputGroup>
          
           </FormGroup >
          
           </Collapse>
           
      
     

        <div>{this.renderExpenses()}</div>
      
        </div> 
        
          </div>
        )
    }
}


function mapStateToProps(state) {

    return {
        expenses: state

    }
}

export default connect(mapStateToProps, {
    addExpense
})(App);