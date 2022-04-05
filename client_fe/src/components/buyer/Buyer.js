import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import Header from "../header/Header";
function Buyer() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getBuyerPurchaseData")
      .then((response) => {
        setTransactions(response.data);
      });
  }, []);

  return (
    <div classNameNameName="container">
      <Header />
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link to='/PurchaseItem' style={{ textDecoration: 'none' }} >
                            <span classNameName="nav-link">Purchase Item</span></Link>
                            <Link to='/createaccount' style={{ textDecoration: 'none' }} >
                            <span classNameName="nav-link">Create Bank Account</span></Link>
                        <li className="nav-item">
                            <a className="nav-link" href="#">View Transactions</a>
                        </li>
                    </ul>

                </div>
            </nav> */}
      {/* <div>hello</div> */}
      <div classNameName="d-flex justify-content-center">
        {/* <table>
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
                </table> */}
        <table className="container table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Buyer Name</th>
              <th>Suplier Name</th>
              <th>Item Name</th>
              <th>Number of Items</th>
              <th>Total Price</th>
              <th>Mode of Payment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
            <tr>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
                <p className="text-muted mb-0">IT department</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td><p className="fw-normal mb-1">Software engineer</p></td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
              <td>
              <p className="fw-normal mb-1">Software engineer</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Buyer;
