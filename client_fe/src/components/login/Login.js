import './Login.css';
import options from '../../Constants';

function Login() {
  return (
    <div class="center">
        <h1>Login</h1>
        <form method="post">
            <div class = "txt_field">
                <input type = "text" required></input>
                <label>Username</label>
            </div>
            
            <div class = "txt_field">
                <input type = "text" required></input>
                <label>Password</label>
            </div>
            
            <div class="pass">Forgot Password?</div>
            <label>Select User Type :  </label>
            <select class = "txt_field" id = "ddlUserType" name = "userType">
                
                <option value="0">Please select</option>
                {
                    options.map((option)=> (<option value = {option.typeId}>{option.userType}</option>))
                }
            </select>
            <input type = "submit" value = "Login"></input>
            <div class="signup_link">Not a member? <a href="#">SignUp</a></div>
        </form>
    </div>
  );
}

export default Login;
