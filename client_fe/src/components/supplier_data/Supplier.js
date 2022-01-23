import React, {useState, useEffect} from 'react';
import './Supplier.css';
import axios from 'axios';
import { sessionConst } from '../../Constants';
import SupplierHomeNavbar from '../SupplierHome/SupplierHomeNavbar';



function Supplier({user}) {

  const [itemName, setItemName] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [item, setItem] = useState({
    itemid : 0,
    sname : "",
    availableItems : 1,
    itemPrice : 0,
    brand : ""
  });

  const [itemList, setItemList] = useState();

  const getItemList = async() => {
    try{
      const response = await axios.get("http://localhost:3001/api/getItem");
        setItemList(response.data);
        // console.log(itemList);
      }catch(err) {
        console.log(err);
      }
  }
  
  const newItemUpdate = (e) => {
    e.preventDefault();
    console.log(itemList);
    let list = async () => {
      try{
        const response = await axios.post("http://localhost:3001/api/newItem", {
          itemName: itemName
        })
        setItemList(response.data)
        // getItemList();
        // console.log(itemList);
      }catch(err){
        console.log(err);
      }
    }
    list();
}

const getId = async() => {
  try{
    const response = await axios.post("http://localhost:3001/api/itemid", {
    selectedItem: selectedItem
  })
  console.log(response.data);
  setItem({...item, itemid : response.data[0].itemId})
  // console.log(item.itemid)
  }catch(err) {
    console.log(err);
  }
}

  useEffect(() => {
    let n = window.sessionStorage.getItem(sessionConst.userName);
    setItem({...item, sname : n})
    
    getItemList()
    getId();
  }, [selectedItem])

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setItem({...item, [name] : value});
  }

  const handleSelectedItem = (e) => {
    setSelectedItem(e.target.value);
    console.log(e.target.value);
    // getId();
  }

  const handleInputNewItem = (e) => {
    console.log(e)
    value = e.target.value;
    setItemName(value);
    console.log(itemName)
  }

  const submitDetails = async(e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3001/api/item", {
      itemid : item.itemid,
      sname : item.sname,
      availableItems : item.availableItems,
      itemPrice : item.itemPrice,
      brand : item.brand
    })
    }catch(err) {
      console.log(err);
    }
  };

    return(
      <>
      <SupplierHomeNavbar />
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
                  <input type="text" className="col-9 form-control" id="sname" name="sname" value={item.sname} onChange={handleInput} required disabled/>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                  <label className="col-3 mx-3" htmlFor="itname">Item Name</label>
                  <select id="itname iname" className="form-control" value={selectedItem} onChange={handleSelectedItem} required>
                    <option value='' selected>Select...</option>
                    {itemList && itemList.map((val) => (
                      <option key={val.itemId} value={val.itemName}>{val.itemName}</option>
                    ))}
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
                        {/* <div className="row align-items-center inputBox">
                          <div className="col mt-3 d-flex align-items-center">
                            <label className="col-3 mx-3" htmlFor="itemid">Item ID</label>
                            <input type="text" className="col-9 form-control" id="itemid" name="itemid" value={item.itemid} onChange={handleInput} placeholder="Enter item ID" required/>
                          </div>
                        </div> */}
                        <div className="row align-items-center inputBox">
                          <div className="col mt-3 d-flex align-items-center">
                            <label className="col-3 mx-3" htmlFor="iname">Item Name</label>
                            <input type="text" className="col-9 form-control" id="itname" name="itemName" value={itemName} onChange={handleInputNewItem} placeholder="Enter item name" required/>
                          </div>
                        </div>
                      </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={newItemUpdate}>Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                <label className="col-3 mx-3" htmlFor="availableItems">Number of Items</label>
                  <input type="number" className="col-9 form-control" id="availableItems" name="availableItems" value={item.availableItems} onChange={handleInput} placeholder="1" required />
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                <label className="col-3 mx-3" htmlFor="itemPrice">Amount per Item</label>
                  <input type="number" className="col-9 form-control" id="itemPrice" name="itemPrice" value={item.itemPrice} onChange={handleInput} placeholder="Enter amount per item" required />
                </div>
              </div>
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 d-flex align-items-center">
                <label className="col-3 mx-3" htmlFor="brand">Brand</label>
                  <input type="text" className="col-9 form-control" id="brand" name="brand" value={item.brand} onChange={handleInput} placeholder="Enter brand name" required />
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
      </>
    );
}

export default Supplier;