import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios, { Axios } from 'axios';
function Buyer() {
    
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/api/getBuyerPurchaseData").then((response) => {
            setTransactions(response.data);
        });
    }, [])

    return (
        <div className="container" >
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <Link to='/PurchaseItem' style={{ textDecoration: 'none' }} >
                            <span className="nav-link">Purchase Item</span></Link>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Create Bank Account</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">View Transactions</a>
                        </li>
                    </ul>

                </div>
            </nav>
            {/* <div>hello</div> */}
            <div>
                <table>
                    <tr>
                        <th>Buyer Name</th>&emsp;
                        <th>Supplier Name</th>&emsp;
                        <th>Item Name</th>&emsp;
                        <th>Number Of Items</th>&emsp;
                        <th>Total Price</th>&emsp;
                        <th>Mode of payment</th>
                    </tr>
                    {transactions.map((item =>
                        <tr>
                         <td>{item.bname}</td>&emsp;
                         <td>{item.sname}</td>&emsp;
                         <td>{item.itemName}</td>&emsp;
                         <td>{item.noOfItems}</td>&emsp;
                         <td>{item.totalPrice}</td>&emsp;
                         <td>{item.modeOfPayment}</td>  
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
}
export default Buyer;
