import React, {useState,useEffect} from 'react';
import './PurchaseItem.css';
import axios, { Axios } from 'axios';
import { sessionConst, modeOfPayment } from '../../Constants';

let userName = window.sessionStorage.getItem(sessionConst.userName);
let totalPrice = 0;
let supplierMap = new Map();
let selectedItemId = 0;
let itemMap = new Map();
let itemPriceMap = new Map();
let availableItemsMap = new Map();
let arr = [];

function PurchaseItem() {
  const [user, setUser] = useState({
    bname : `${userName}`,
    itemId : 0,
    sname : "",
    noOfItems : "",
    totalPrice : `${totalPrice}`,
    modeOfPayment : "",
  });

  const [items, setItems] = useState([])
  const [supplierItemTransactionDetails , setSupplierItemTransactionDetails] = useState([]);
  const [array,setArray] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:3001/api/getItems").then((response) => {
      setItems(response.data);
    });
    axios.get("http://localhost:3001/api/getSupplierItems").then((response) => {
      setSupplierItemTransactionDetails(response.data);
    });
  }, []);
  let name, value;
  const handleInput = (e) => {
    
    name = e.target.name;
    value = e.target.value;
    console.log(name , " ", value);
    setUser({...user, [name] : value});
    

  }
  const HandleItemChange = (e) => {
      handleInput(e);
      selectedItemId = e.target.value;


      // item name : item id  => supplier details
      // itemmap : key : item id value map : (<supplier : available item>)

      supplierItemTransactionDetails.map((val) => { 
      
      let snameMap = new Map(); // key - supplierName , value - item price
      if(!itemMap.has(val.itemId)){
        itemMap.set(val.itemId , snameMap);
      }

      snameMap = itemMap.get(val.itemId);
      snameMap.set(val.sname , val.availableItems);
      itemMap.set(val.itemId,snameMap);


      var str = val.itemId+":"+val.sname;
      
      itemPriceMap.set(str,val.itemPrice);
      
      availableItemsMap.set(str,val.availableItems);

    })

    supplierMap = itemMap.get(parseInt(selectedItemId));

    arr = Array.from(supplierMap, ([name, value]) => ({ name, value }));
    setArray(arr);
    console.log("arrays is : ",arr);
    }

  const handlePriceChange = (e) => {
    handleInput(e);
    var str = selectedItemId+":"+user.sname;

    console.log(value);
    console.log(parseInt(availableItemsMap.get(str)));
    
    if(value > parseInt(availableItemsMap.get(str))){
      alert("Stock unavailable");
    }

    totalPrice = value*itemPriceMap.get(str);
    console.log(totalPrice);
    user.totalPrice = `${totalPrice}`;
  }

  const submitDetails = async(e) => {
    // setUser({...user,[user.totalPrice] : `${totalPrice}`});
    e.preventDefault();
    axios.post("http://localhost:3001/api/submitBuyerPurchase", 
    {
      bname : user.bname,
      itemId : user.itemId,
      sname : user.sname,
      noOfItems : user.noOfItems,
      totalPrice : `${totalPrice}`,
      modeOfPayment : user.modeOfPayment
    },).then(() => {
      console.log("post body");
    }).catch((err) => { console.log('Axios Error:', err); })
  };

    return (
        <div className="container">
          <form className="row justify-content-center" method="post">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="row mt-2">
                <div className="col text-center">
                  <h1 className="heading">Purchase Item</h1>
                  <p className="text-h3">Please fill in this form to purchase any item</p>
                </div>
              </div>
              <div className="row align-items-center inputBox">
                <div className="col mt-2 form-floating">
                  <input type="text" disabled = 'true'  className="form-control" id="b-name" name="bname" value={userName} onChange={handleInput} placeholder="Enter your first name" required />
                  <label className="mx-3" htmlFor="bname">Buyer Name</label>
                </div>
              </div>
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlUserType" name="itemId" value={user.itemId} onChange={HandleItemChange} required >
                  <option value="0">Select Item</option>
                    {items && items.map((val) => (
                    <option value={val.itemId}>{val.itemName}</option>
                  ))}
                </select>
              </div>
              
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlUserType" name="sname" value={user.sname} onChange={handleInput} required >
                  <option value="0">Select Supplier Name</option>
                    {/* {supplierMap && supplierMap.forEach((key,value) => {
                      <option value={key}>{value}</option> 
                      console.log(supplierMap);
                    })} */}
                    {
                        array?.map((input) => (
                          <option value={input.name}>{input.name} (Available Items : {input.value})</option>
                        
                        ))
                    }
                </select>
              </div>
              
              <div className="row align-items-center inputBox mt-4">
                <div className="col form-floating mt-1">
                  <input type="text" className="form-control" id="noOf-items" name="noOfItems" value={user.noOfItems} onChange={handlePriceChange} placeholder="Enter your last name" required/>
                  <label className="mx-3" htmlFor="noOfItems">Number of Purchase Items</label>
                </div>
              </div>
              
              <div className="row align-items-center inputBox mt-4">
                <div className="col mt-1 form-floating">
                  <input type="text" disabled = 'true' className="form-control" id="total-price" name="totalPrice" value={totalPrice} onChange={handleInput} required />
                  <label className="mx-3" htmlFor="totalPrice">Total Price</label>
                </div>
              </div>
              
              <div className="row justify-content-center mt-4 inputBox">
                <select className="mt-2 form-select" id="ddlUserType" name="modeOfPayment" value={user.modeOfPayment} onChange={handleInput} required >
                  <option value="0">Select mode of payment</option>
                    {modeOfPayment.map((option, index) => (
                    <option key={index} value={option.mode}>{option.mode}</option>
                  ))}
                </select>
              </div>

              <div className="row justify-content-start mt-3">
                <div className="col">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" required />
                      I Read and Accept <a href="/">Terms and Conditions</a>
                    </label>
                  </div>
                  <button className="btn btn-primary mt-3" onClick = {(e) => submitDetails(e)}>Purchase Item</button>
                </div>
              </div>
              
          </div>
        </form>
      </div>
    );

}

export default PurchaseItem;