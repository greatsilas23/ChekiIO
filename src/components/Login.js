import React from 'react'

function Home(props){
	return(
		<div>
			<form onSubmit={props.hideLogin} action="http://localhost:4000/login" method="post">
				<label>Username:</label> <input type="text" id="userName" name="userName" placeholder="example@gmail.com"/><br/>
 				<label>Password:</label> <input type="password" id="userPass" name="userPass" placeholder="****"/><br/>
				<input type="submit" value="LOG-IN"/><br/>
				<label>Remember Me </label><input type="checkbox"/><br/>
                		<span>Not a registered user? Sign up</span> <a href="register.html">here</a>
			</form>
		</div>
		)
}

export default Home
