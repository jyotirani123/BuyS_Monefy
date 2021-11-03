import './App.css';
const constants = require('./Constants');

function App() {
  return (
    <div className="App"> 
      <div name  = "form">
        <h1> LOGIN </h1>
        <label> Username : </label>  <input type = "text" name = "userName"/> <br/> <br/>
        <label> Password : </label>  <input type = "password" name = "password"/> <br/>  <br/>
        <select id="ddlUserType" name="userType">
            <option value="0">Please select</option>
            @foreach (var userinfo in constants.allConstants())
            {
                <option value="@userinfo.typeId">`@{userinfo.userType}`</option>
            }
        </select>
        <input type = "button" name = "submit" value = "Submit"/>
        <input type = "button" name = "submit" value = "Submit"/>
    </div>
    </div>
  );
}

export default App;
