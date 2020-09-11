import React, { useState,useEffect } from "react";
import "./App.css";
import Alert from "./components/Alert";
import ExpenseList from "./components/ExpenseList";
import ExpenseItem from "./components/ExpenseItem";
import ExpenseForm from "./components/ExpenseForm";
import uuid from "react-uuid";

//later on we can transfer it to a loacal storage
const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 400 },
  { id: uuid(), charge: "credit card bill", amount: 1200 },
];

// const initialExpenses = localStorage.getItem("expenses")
// ? JSON.parse(localStorage.getItem("expenses")) : [];
function App() {
  //************************** state Values **********************  */
  // all expenses and add expenses
  const [expenses, setExpanses] = useState(initialExpenses);

  //single expense
  const [charge, setCharge] = useState("");

  //single amount
  const [amount, setAmount] = useState("");

  //alert
  const [alert, setAlert] = useState({ show: false });

  //edit
  const [edit,setEdit] = useState(false);

  // edit item
  const[id,setId] = useState(0);

  //useEffect
  // useEffect(() => {
  //   localStorage.setItem("expenses",JSON.stringify(expenses));
  // },[expenses])
  //************************** Functionality **********************  */

  //handle charge
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //handle alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {

      if(edit){
        //map is used for accessing each and every element of array and editing if required
       let tempExpenses = expenses.map(item => {
         return item.id === id ? {...item,charge:charge,amount:amount}  : item;
       });
       setExpanses(tempExpenses);
       setEdit(false);
       handleAlert({ type: "success", text: "item edited" });
      
      }
      else{
        const newExpense = {
          id: uuid(),
          charge: charge,
          amount: amount
        };
        setExpanses([...initialExpenses, newExpense]);
        handleAlert({ type: "success", text: "item added" });
        console.log('trapped',initialExpenses);
        
      }
      setCharge("");
      setAmount("");
    }
     else {
      //handle alert call
      handleAlert({
        type: "danger",
        text: `charge can't be empty value & amount > 0`,
      });
    }
  
  };

  //clear all values
  const clearItems = () => {
    setExpanses([]);
    handleAlert({type:"danger", text: "All items deleted"})
  };

  // handle delete
  const handleDelete = (id) => {
    //Filter is used to get all the elements of array except the one whose id matches
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpanses(tempExpenses);
    handleAlert({type:"danger", text: "item deleted"})
  };

  // handle edit
  const handleEdit = (id) => {
    //find is used to get the one object/item whose id matches with the given id
  let expense = expenses.find(item => item.id === id);
  let {charge,amount} = expense;
  setCharge(charge);
  setAmount(amount);
  setEdit(true);
  setId(id);

  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      {/* <Alert /> */}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
        expenses={expenses}
         handleDelete={handleDelete} 
           handleEdit={handleEdit}
           clearItems={clearItems}
         />
      </main>
      <h1>
        Total Spending:{""}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
