/* Date created: 23rd March
   Date modified: 
*/

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
