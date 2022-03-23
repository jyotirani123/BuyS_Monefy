import React, {useState} from 'react';
import { sessionConst } from '../../Constants';
// import './BankDashboard.css';
import BankNav from './BankNav';
import Item from './Item';

function BankDashboard() {
        const data=JSON.parse(window.sessionStorage.getItem("acc"));
    
    const [accounts,setaccounts]=useState(data);
    const username =window.sessionStorage.getItem(sessionConst.userName);
    console.log(username,data);
    const accArray=accounts.filter((acc,i)=>{if(acc.bankname===username){return acc;}},username)
    console.log("accArray: ",accArray);    


    return (
        <div className='bank_dashboard'>
         <BankNav accounts={accArray} bankName={username}/>
          <table className='bank_details'> 
          <tr><th>Customer Name</th>
          <th>IFSC Code</th>
          <th>Account Number</th></tr>
           
  {accArray.map((acc,i)=>(<Item key={i} name={acc.customername} accno={acc.accnum} ifsc={acc.ifsc} />))}
  </table>        
     </div>
    )
}

export default BankDashboard;
