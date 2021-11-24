import React, {useState} from 'react';
import './Supplier.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Supplier() {

  let navigate = useNavigate();
  const [item, setItem] = useState({
    sname : "",
    itname : "",
    itemid : "",
    itemno : "",
    amount : "",
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setItem({...item, [name] : value});
  }
  const submitDetails = () => {
    axios.post("http://localhost:3001/api/item", 
    {
      sname : item.sname , 
      itname : item.itname,
      itemid : item.itemid,
      itemno : item.itemno,
      amount : item.amount,
    },).then((res) => {
      console.log(res);
    }).catch((err) => { console.log('Axios Error:', err); })
  };

    return(
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-xl-10">
              <div className="row mt-5">
                <div className="col text-center">
                  <h1 className="heading">Item Details</h1>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-3 d-flex align-items-center">
                  <label className="col-3 mx-3" htmlFor="sname">Supplier Name</label>
                  <input type="text" className="col-9 form-control" id="sname" name="sname" value={item.sname} onChange={handleInput} placeholder="ABC" required disabled/>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                  <label className="col-3 mx-3" htmlFor="itname">Item Name</label>
                  <select id="itname iname" className="form-control" value={item.itname} onChange={handleInput} required>
                    <option selected>Choose...</option>
                    <option>ABC</option>
                    <option>ABC</option>
                    <option>ABC</option>
                    <option>ABC</option>
                    <option>ABC</option>
                  </select>
                  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Add New Item</button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Item</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                        <div className="row align-items-center inputBox">
                          <div className="col mt-3 d-flex align-items-center">
                            <label className="col-3 mx-3" htmlFor="itemid">Item ID</label>
                            <input type="text" className="col-9 form-control" id="itemid" name="itemid" value={item.itemid} onChange={handleInput} placeholder="Enter item ID" required/>
                          </div>
                        </div>
                        <div className="row align-items-center inputBox">
                          <div className="col mt-3 d-flex align-items-center">
                            <label className="col-3 mx-3" htmlFor="iname">Item Name</label>
                            <input type="text" className="col-9 form-control" id="itname" name="itname" value={item.itname} onChange={handleInput} placeholder="Enter item name" required/>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                <label className="col-3 mx-3" htmlFor="itemno">Number of Items</label>
                  <input type="text" className="col-9 form-control" id="itemno" name="itemno" value={item.itemno} onChange={handleInput} placeholder="1" required />
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                <label className="col-3 mx-3" htmlFor="amount">Amount per Item</label>
                  <input type="text" className="col-9 form-control" id="amount" name="amount" value={item.amount} onChange={handleInput} placeholder="Enter amount per item" required />
                </div>
              </div>
              <div className="row justify-content-start my-3">
                <div className="col">
                  <button className="btn btn-primary mt-3" onClick={submitDetails}>Submit</button>
                </div>
              </div>
          </div>
        </form>
      </div>
    );
}

export default Supplier;