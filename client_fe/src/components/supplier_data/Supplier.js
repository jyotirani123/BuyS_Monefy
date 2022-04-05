import React, {useState, useEffect} from 'react';
import './Supplier.css';
import axios from 'axios';
import { sessionConst } from '../../Constants';
import SupplierHomeNavbar from '../SupplierHome/SupplierHomeNavbar';
import Header from '../header/Header';



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
      {/* <SupplierHomeNavbar /> */}
      <Header/>
      
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-5 col-md-2 col-lg-2 col-xl-5">
              <div className="row mt-1">
                <div className="col text-center">
                  <h1 className="heading">Item Details</h1>
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="itname iname" className="form-control item_input" value={selectedItem} onChange={handleSelectedItem} required>
                    <option value='' selected>Select...</option>
                    {itemList && itemList.map((val) => (
                      <option key={val.itemId} value={val.itemName}>{val.itemName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="itname">Category</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal">Add New Category</button>
                  <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Category</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                    
                        <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="itname" name="itemName" value={itemName} onChange={handleInputNewItem} placeholder="Enter item name" required/>
                            <label className="mx-3" htmlFor="iname">Category</label>
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
              
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="itname iname" className="form-control item_input" value={selectedItem} onChange={handleSelectedItem} required>
                    <option value='' selected>Select...</option>
                    {itemList && itemList.map((val) => (
                      <option key={val.itemId} value={val.itemName}>{val.itemName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="itname">Item Name</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal1">Add New Item</button>
                  <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="itname" name="itemName" value={itemName} onChange={handleInputNewItem} placeholder="Enter item name" required/>
                            <label className="mx-3" htmlFor="iname">Item Name</label>
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
            {/* <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                
                  <input type="text" className=" form-control" id="brand" name="brand" value={item.brand} onChange={handleInput} placeholder="Enter brand name" required />
                  <label className=" mx-3" htmlFor="brand">Brand</label>
                </div>
              </div> */}
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating d-flex align-items-center justify-content-between">
                  
                  <select id="brand" className="form-control item_input" value={selectedItem} onChange={handleSelectedItem} required>
                    <option value='' selected>Select...</option>
                    {itemList && itemList.map((val) => (
                      <option key={val.itemId} value={val.itemName}>{val.itemName}</option>
                    ))}
                  </select>
                  <label className=" mx-3" htmlFor="brand">Brand Name</label>
                  <button type="button" className="btn btn-primary ml-3 btn-md " data-toggle="modal" data-target="#exampleModal2">Add New Brand</button>
                  <div className="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Add New Brand</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      <div className="modal-body">
                      <form className="row justify-content-center" method="post">
                    
                        <div className="row align-items-center inputBox">
                          <div className="col mt-1 form-floating">
                            
                            <input type="text" className=" form-control" id="brand" name="brand" value={itemName} onChange={handleInputNewItem} placeholder="Enter item name" required/>
                            <label className="mx-3" htmlFor="brand">Brand Name</label>
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


              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
                <input type="number" className=" form-control" id="availableItems" name="availableItems" value={item.availableItems} onChange={handleInput} placeholder="1" required />
                <label className=" mx-3" htmlFor="availableItems">Number of Items</label>
                 
                </div>
              </div>
              <div className="row align-items-center inputBox mt-1">
                <div className="col mt-1 form-floating">
               
                  <input type="number" className=" form-control" id="itemPrice" name="itemPrice" value={item.itemPrice} onChange={handleInput} placeholder="Enter amount per item" required />
                  <label className=" mx-3" htmlFor="itemPrice">Amount per Item</label>
                </div>
              </div>
             
              <div className="row justify-content-start my-3">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-primary btn-lg mt-1" onClick={submitDetails}>Submit</button>
                </div>
              </div>
          </div>
        </form>
      </div>
      </>
    );
}

export default Supplier;