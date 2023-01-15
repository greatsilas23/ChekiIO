import React, { Component } from 'react'
import Home from './components/Home.js'
import Login from './components/Login.js'

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
  hideLogin = () => {
    if(this.state.showLogin == true) {
	 this.setState({ showLogin: false }) 
	 this.setState({ showHome: true })
   } else {
	 this.setState({ showLogin: true })
	 this.setState({ showHome: false })
  }
  }
  render(){
  return (
    <div>

       {this.state.showLogin && <Login hideLogin={this.hideLogin}/>}
       {this.state.showHome && <Home />}
    </div>
  )
  }
}

export default App;
