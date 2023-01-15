<<<<<<< HEAD
#ChekiIO
This is a website for cars
```javascript
    let items_arr = new Array()
	let item_id_to_add = 0 
	let popupIsShowing = false
	let users = new Array()
	let isLoggedIn
	document.getElementById("defaultOpen").click()

	function openOption(carState,elemnt,color){
		var i, tabcontent, tablinks

		tabcontent = document.getElementsByClassName("tabcontent")
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none"
		}

		tablinks = document.getElementsByClassName("tablink")
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].style.backgroundColor = ""
		}

		document.getElementById(carState).style.display = "block"
		elemnt.style.backgroundColor = color

	}
	function getUsers(){
		var str = localStorage.getItem("local_items")
		if(str != null){
			items_arr = JSON.parse(str)
		}

	}

	function getId(){
		var str = localStorage.getItem("local_item_to_add")
		if(str != null){
			item_id_to_add = JSON.parse(str)
		}
	}

	function getCardItem(){
		getItems()
		var search_item_name = document.getElementById("input#item_name").value
		for(var i = 0; i < items_arr.length; i++){
			if (items_arr[i].item_name == search_item_name)
				var item_id = items_arr[i].item_id
		}
		return item_id		
	}

	function setCardItem(){
		let item_id = `SN${Math.floor(Math.random(100))}`
		items_arr.push({
			item_id: item_id,
			item_price: document.getElementById("input#item_price").value,
			item_name: document.getElementById("input#item_name").value
		})
		localStorage.setItem("local_items", JSON.stringify(items_arr))
		localStorage.setItem("local_item_to_add", JSON.stringify(items_id))
	}

	function showCardItem(){
		getItems()
		getId()
		let item_price = 0
		let item_name = ""
		for(var i = 0; i < items_arr.length; i++){
			if(items_arr[i].item_id == item_id_to_add){
				item_price = items_arr[i].item_price
				item_name = items_arr[i].item_name
			}
		}
		document.getElementById("card_collection_1").innerHTML = ( 
		'<div class="card_view_item">'+'center'+
			'<p>item price"+`${item_price}`</p>'+
			'<p>item name"+`${item_name}`</p>'+
			'<p>item id"+`${item_id_to_add}`</p>'+
			'</center>'+
		'</div>')
	}

	function display_login(){
		if(popupIsShowing === false){
			document.getElementById("login_form").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("login_form").style.display = "none"
			popupIsShowing = false
		}
	}

	function getUsersDetails(){
		let str = localStorage.getItem("usersRegistered")
		if(str != null){
			users = JSON.parse(str)
		} 
	}
	function authenticate_login(){
		getUsersDetails()
		let login_usr_name_or_email = document.getElementById("login_usr_name_or_email").value
		let login_usr_pass = document.getElementById("login_usr_pass").value
		for(let i = 0; i < users.length; i++){
			if(users[i].usr_email === login_usr_name_or_email || users[i].usr_name === login_usr_name_or_email){
				users[i].isLoggedIn = true
				console.log("logged in as ", users[i].usr_name)
				document.getElementById("login_form").style.display = "none"
				isLoggedIn = users[i].usr_name
			}
			else{
				document.getElementById("var_err").innerHTML = "Incorrect username or password"
			}
		}
		document.getElementById("login_details_form").reset()
		display_login_name()
	}

	function register_user(){
		getUsersDetails()
		let usr_fname = document.getElementById("usr_fname").value
		let usr_lname = document.getElementById("usr_lname").value
		let usr_name = document.getElementById("usr_name").value
		let usr_email = document.getElementById("usr_email").value
		let usr_pass = document.getElementById("usr_pass").value
		let usr_pass_confirm = document.getElementById("usr_pass_confirm").value
		users.push({
			usr_fname: usr_fname,
			usr_lname: usr_lname,
			usr_name: usr_name,
			usr_email: usr_email,
			usr_pass: usr_pass,
			isLoggedIn: false
		})
		localStorage.setItem("usersRegistered", JSON.stringify(users))
		document.getElementById("register_form").style.display = "none"
		document.getElementById("register_details_form").reset()
		console.log("registered as ", usr_name)
		
	}
	
	function display_registration(){
		if(popupIsShowing === false){
			document.getElementById("register_form").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("register_form").style.display = "none"
			popupIsShowing = false
		}
	}
	function display_dealer_login(){
		if(popupIsShowing === false){
			document.getElementById("dealer_form").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("dealer_form").style.display = "none"
			popupIsShowing = false
		}
	}
	function display_car_loan_form(){
		if(popupIsShowing === false){
			document.getElementById("car_loans_form").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("car_loans_form").style.display = "none"
			popupIsShowing = false
		}
	}
	function display_insurers(){
		if(popupIsShowing === false){
			document.getElementById("insurance_form").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("insurance_form").style.display = "none"
			popupIsShowing = false
		}
	}
	function display_login_name(){
		getUsersDetails()
		for(let i = 0; i < users.length; i++){
			if(users[i].usr_name === isLoggedIn){
				document.getElementById("loggedIn").innerHTML ="Welcome, " +users[i].usr_fname
			}
		}
	}

	function showRequestCarForm(){
		if(popupIsShowing === false){
			document.getElementById("car_loans_form_8").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("car_loans_form_8").style.display = "none"
			popupIsShowing = false
		}
	}

	function showSellCarForm(){
		if(popupIsShowing === false){
			document.getElementById("car_loans_form_10").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("car_loans_form_10").style.display = "none"
			popupIsShowing = false
		}
	}

	function displayMain(){
		if(popupIsShowing === false){
			document.getElementById("popup").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("popup").style.display = "none"
			popupIsShowing = false
		}
	}

	function displayDealer(){
		if(popupIsShowing === false){
			document.getElementById("dealer_popup").style.opacity = "1"
			document.getElementById("dealer_popup").style.visibility = "visible"
			popupIsShowing = true
		} else {
			document.getElementById("dealer_popup").style.opacity = "0"
			document.getElementById("dealer_popup").style.visibility = "hidden"
			popupIsShowing = false
		}
	}

	function displayVehicleTypes(){
		if(popupIsShowing === false){
			document.getElementById("vehicle_type_popup").style.display = "inline"
			popupIsShowing = true
		} else {
			document.getElementById("vehicle_type_popup").style.display = "none"
			popupIsShowing = false
		}
	}
```
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> 1561493ae65d71d2626a692e4533a0f10c882e4c
