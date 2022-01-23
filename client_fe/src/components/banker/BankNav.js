import React, {useState}from 'react'
import Item from './Item';
import './BankNav.css';

function BankNav({accounts,bankName}) {
 const [state,setState]=useState('');
 let name, value;
 const handleInput = (e) => {
   console.log(e);
   
  value = e.target.value.toLowerCase();
  setState(value);
 
   console.log(state);
 }
 const filterAccounts=(e)=>{
   e.preventDefault();
 
 
   let filteredAccounts=accounts.filter((item,i)=>{if(item.customername.toLowerCase()===state){return item;}},state)
   console.log(filteredAccounts);
   filteredAccounts.map((items,i)=>(<Item key={i} name={items.customername} bankname={items.bankname} ifsc={items.ifsc} accno={items.accnum}/>))
}
    return (
        <div>
            {/* <nav class="navbar navbar-dark bg-dark">
 
</nav> */}
<nav class="navbar navbar-light bg-light justify-content-between">
  <a class="navbar-brand">Bank Dashboard</a>
  <h2>Bank Name: <u>{bankName.toUpperCase()}</u></h2>
  <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search"  onChange={(e)=>handleInput(e)}/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(e)=>filterAccounts(e)}>Search</button>
  </form>
</nav>


        </div>
    )
}

export default BankNav
