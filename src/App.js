import React, { Component } from 'react'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showHome: false,
      showLogin: true,
      users: [],
      items: []
   }
  }

  render(){
  return (
    <div className="w-100 h-100 m-auto bg-info">

       {this.state.showLogin &&
           <section className="w-30 h-30 m-auto bg-warning">



             <form
                 action="http://localhost:4000/login"
                 method="post"
             >
               <label>Username:</label>
               <input type="text" id="userName" name="userName" placeholder="example@gmail.com"/><br/>
               <label>Password:</label>
               <input type="password" id="userPass" name="userPass" placeholder="****"/><br/>
               <input type="submit" value="LOG-IN"/><br/>
               <label>Remember Me </label><input type="checkbox"/><br/>
               <span>Not a registered user? Sign up</span> <a href="register.html">here</a>
             </form>
           </section>
       }
       {this.state.showHome &&
           <section>
             <a> Home </a>
             <a> About </a>
             <a> Contacts </a>
             <a> Cart </a>
             <a> Billing </a>
             <a> Profile </a><br/>

             <span> greatsilas23 </span> &copy;
           </section>
       }
      {this.state.showCheckout &&
          <section>
            <form action="http://localhost:4000/checkout" method="post">
              <input type="file">
              Id: <input type="text" placeholder="ID001"/>
              Name: <input type="text" placeholder="Falafel" />
              Price: <input type="number" placeholder="Ksh. 100"/>
              <input type="submit"/>
            </form>
          </section>
      }
    </div>
  )
  }
}

export default App;
