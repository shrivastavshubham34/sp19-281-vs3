import React,{ Component } from 'react';
import { Route, Redirect,withRouter } from 'react-router-dom';
import './login.css';
import Navbar from "./../Menu/Navbar.jsx";
import { Button,Modal,Checkbox } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {userSignUp} from './../../apis/menu-api';


class Signup extends Component {
	constructor(props) {
		super(props);
		this.userDetails = {
			username: "",
			password: "",
			adminFlag: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
		console.log("Checkbox selected: ", name);
		if(name == "Admin")
			this.userDetails.adminFlag = true;
  }
	render() {
		return(
			<div className="signup-container">
				  <img className="signupimage" alt = "home" src= "http://www.ctvisit.com/sites/default/files/starbucks_2.png" />
						<form className="form-group2">
    						<table className="login-table">
                  <tr className="first-line">Create an Account</tr>
                  <br></br>
                    <tr><label className="itemLabel"> First Name </label><br></br></tr>
    						      <tr>
    						      		<td><input type="text" className="itemInputText" required
                          onChange={(userinput) => {
                              this.userDetails.username=userinput.target.value}}/>
                          </td>
    						      </tr>
                      <tr><label className="itemLabel"> Password </label><br></br></tr>
    						      <tr > <td><input type="password" required className="itemInputText"
                      onChange={(userinput) => {
                          this.userDetails.password=userinput.target.value}}/>
                      </td></tr>
											<tr>
													<input onChange={this.handleInputChange} type="checkbox" name="Admin" value="Admin" />Admin
											</tr>
											<button type="button" onClick={(e) =>this.props.userSignUp(this.userDetails)}
											 className="btn btn-primary join">Sign Up</button>
											 <button type="button" onClick={(e) =>this.props.history.push('/login')}
 											 className="btn btn-primary join">Login</button>
    							</table>
						   </form>
			</div>
			);
	}
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({userSignUp: userSignUp}, dispatch);
}
export default connect(null, matchDispatchToProps)(Signup);