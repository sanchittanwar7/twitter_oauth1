import React,{Component} from "react";
import {Accounts} from "meteor/accounts-base";

export default class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      error:""
    }
    this.onChangeEmail=this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onChangePassword(event){
    this.setState({
      password:event.target.value,
      error:""
    })

  }
  onChangeEmail(event){
    this.setState({
      email:event.target.value,
      error:""
    })

  }
  submitForm(){
    let {email,password}=this.state;
    if(!email || !password)
    {
      this.setState({
        error:"Input Missing"
      })
      return
    }




    Accounts.createUser({email,password},(err)=>{
      if(err){
        console.log("err", err);
        console.log(email, password)
        Meteor.loginWithPassword({email: email}, password, (err) => {
          if(err)
            console.log(err)
          else
            console.log("logged in")
        })

      }
      else {
        console.log("succesfully authenticated");
        this.setState({email:"",password:"",error:""})
      }

    });
  }


  render(){
    return(
      <div>
      <input value={this.state.email} type="text" onChange={this.onChangeEmail} placeholder="email"/>
      <input  value ={this.state.password} type="password" onChange = {this.onChangePassword} placeholder="password"/>
      <button onClick={this.submitForm}>Submit</button>
      </div>
      )
  }
}