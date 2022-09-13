import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super();
    this.state={
      email: null,
      password : null,
      login : false,
      store : null,
    }
  }
  componentDidMount(){
    this.storeCollector();
  }
  storeCollector(){
    console.log('Hello From StoreCollector');
    let store=JSON.parse(localStorage.getItem('login'));
    this.setState({store:store})
    if(store && store.login){
      this.setState({login:true})
    }
  }
  login(){
    // console.log('from data', this.state);
    fetch('https://staging.blacktieskis.com/api/auth/login',{
      method:'POST',
      headers: {'Content-Type' : 'application/json'},
      body:JSON.stringify(this.state)
    }).then((resp)=>{
        resp.json().then((result)=>{
          // console.log("result", result);
          localStorage.setItem('login',JSON.stringify({
            login:true,
            token:result.data.access_token
          }))
          this.setState({login:true});
          this.storeCollector();
          
        })
    })
  }

  post(){
    let token = 'Brearer' + this.state.store.token;
    console.log(token);
    fetch('https://staging.blacktieskis.com/api/auth/login',{
      method: 'POST',
      headers:{
        'Authrization': token
      },
      body:this.state.post,
    }).then((resp)=>{
      resp.json().then((result)=>{
        console.log('result',result);
      })
    })
  }

  // post(e){
  //   // console.log('from data', this.state);
  //   fetch('https://staging.blacktieskis.com/api/auth/posts',{
  //     method:'POST',
  //     headers: {'Content-Type' : 'application/json'},
  //     body:JSON.stringify(e.target.value)
  //   }).then((resp)=>{
  //       resp.json().then((result)=>{
  //         console.log("result", result);
  //       })
  //   })
  // }
  render() {
    return (
      <div>
        <h1>Jwt</h1>
        
          {!this.state.login?

            <div>
                <input type='text' onChange={(event)=> {this.setState({email:event.target.value})}} /><br/><br/>
                <input type='password' onChange={(event)=> {this.setState({password:event.target.value})}} /><br/><br/>
                <button onClick={()=>{this.login()}}>Login</button>
            </div>
            :
            <div>
                <br/>
                <textarea onChange={(event)=>{this.setState=({post:event.target.value})}} >

                </textarea>
                <br/>
                <button onClick={()=>{this.post()}}>Post Data</button>
            </div>

          }

      </div>
    )
  }
}
