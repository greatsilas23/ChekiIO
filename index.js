/**
 * createdBy: greatsilas23
 * lastModifiedBy: greatsilas23
 * dateCreated: Tue 22 Aug 8:00:00 +0300
 * dateModified: Tue 22 Aug 11:14:00 +0300
 */ 
import { getDatabase, ref, child, get } from "firebase/database";
/*
<?php
    $myItems = array('', '', '');
    $isIn = false;
    function searchItem(){
        if(isset($_POST['search']){
            if(in_array($_POST['search'], $myItems)){
                echo "<h2>".$_POST['search']." FOUND"."</h2>";
                $isIn = true;
            } else {
               echo "<h2>".$_POST['search']." NOT FOUND"."</h2>";
               $isIn = false;
            }
        }
        return $isIn;
    }
?>

$myItems = array();
    $myBorrowedItems = array();
    $myReturnedItems = array();
    $myEditedItems = array();
    $isIn = false;
    function addProject(){
        if(isset($_POST['add']){
            if(in_array($_POST['addISBN'], $myItems['ISBN'])){
                echo "<h2>".$_POST['addISBN']." ALREADY EXISTS"."</h2>";
                $isIn = true;
            } else {
                $newRow = array(
                    "ISBN" => $_POST['addISBN'],
                    "Name" => $_POST['addName'],
                    "Category" => $_POST['addCategory'],
                    "Author" => $_POST['addAuthor'],
                    "Pages" => $_POST['addPages']
                );
                array_push($myItems, $newRow);
                echo $myItems;
            }
        }
        return $isIn;
    }

    function borrowProject(){
        if(isset($_POST['borrow']){
            if(in_array($_POST['borrowISBN'], $myBorrowedItems['ISBN'])){
                $isIn = true;
                echo "<h2>".$_POST['borrowISBN']." ALREADY BORROWED"."</h2>";
            } else {
                $isIn = false;
                $newBorrow = array(
                     "ISBN" => $_POST['borrowISBN'],
                     "StudentName" => $_POST['borrowStudentName'],
                     "DueDate" => $_POST['borrowDueDate'],
                     "BorrowDate" => $_POST['BorrowDate'],
                     "RegNo" => $_POST['borrowRegNo']
                );
                array_push($myBorrowedItems, $newBorrow);
                echo $myBorrowedItems;
            }
        }
        return $isIn;
    }
    function returnItem(){
        if(isset($_POST['returnItem']){
            if(in_array($_POST['returnISBN'], $myBorrowedItems['ISBN'])){
                $isIn = true;
                $newReturn = array(
                     "ISBN" => $_POST['returnISBN'],
                     "BorrowDate" => $_POST['returnBorrowDate'],
                     "ContentFeedback" => $_POST['returnContentFeedback'],
                     "RegNo" => $_POST['returnRegNo'],
                     "ProjectCondition" => $_POST['returnConditionFeedback'],
                );
                array_push($myReturnedItems, $newReturn);
                echo $myReturnedItems;
            } else {
                $isIn = false;
                echo "<h2>".$_POST['returnISBN']." DOESN'T EXIST"."</h2>";
            }
        }
        return $isIn;
    }
    function editProject(){
        if(isset($_POST['edit']){
            if(in_array($_POST['editISBN'], $myItems)){
               $isIn = true;
               $newEdits = array(
                "ISBN" => $_POST['editISBN'],
                "Category" => $_POST['editCategory'],
                 "Name" => $_POST['editName'],
                "Author" => $_POST['editAuthor'],
                "Pages" => $_POST['editPages']
               );
               array_push($myEditedItems, $newEdits);
            }
        } else {
            $isIn = false;
            echo "<h2>".$_POST['editISBN']." DOESN'T EXIST"."</h2>";
        }
        return $isIn;
    }

 $myItems = array('');
    $isIn = false;
    function addBook(){
        if(isset($_POST['search']){
            if(in_array($_POST['search'], $myItems)){
                echo "<h2>".$_POST['search']." FOUND"."</h2>";
                $isIn = true;
            } else {
               echo "<h2>".$_POST['search']." NOT FOUND"."</h2>";
               $isIn = false;
            }
        }
        return $isIn;
    }

    function borrowBook(){
        if(isset($_POST['search']){
            if(in_array($_POST['search'], $myItems)){
                echo "<h2>".$_POST['search']." FOUND"."</h2>";
                $isIn = true;
            } else {
               echo "<h2>".$_POST['search']." NOT FOUND"."</h2>";
               $isIn = false;
            }
        }
        return $isIn;
    }
    function returnItem(){
        if(isset($_POST['search']){
            if(in_array($_POST['search'], $myItems)){
                echo "<h2>".$_POST['search']." FOUND"."</h2>";
                $isIn = true;
            } else {
               echo "<h2>".$_POST['search']." NOT FOUND"."</h2>";
               $isIn = false;
            }
        }
        return $isIn;
    }
    function editItem(){
        if(isset($_POST['search']){
            if(in_array($_POST['search'], $myItems)){
                echo "<h2>".$_POST['search']." FOUND"."</h2>";
                $isIn = true;
            } else {
               echo "<h2>".$_POST['search']." NOT FOUND"."</h2>";
               $isIn = false;
            }
        }
        return $isIn;
    }

*/
class Client{
constructor(){
this.isEmpty = false
}
getClient(){
const clientBorrow = `<div class="root">
            <div class="topSide">
                <div class="alignIconHome">
                    <img class="mainIconImage" src="./res/shelf.png" alt="icon">
                </div>
            </div>
            <div class="groupTablink addTopLeftCurve addTopRightCurve">
                <table>
                    <tr>
                        <td>
                            <div id="availableLink" class="tablink availableLink" ><p>AVAILABLE </p></div>
                        </td>
                        <td>
                            <div id="addLink" class="tablink addLink" title="INSERT RECORDS" ><p>ADD </p></div>
                        </td>
                        <td>
                            <div id="borrowLink" class="tablink borrowLink"><p>BORROW </p></div>
                        </td>
                        <td>
                            <div id="returnLink" class="tablink returnLink"><p>RETURN </p></div>
                        </td>
                        <td>
                            <div id="overdueLink" class="tablink overdueLink" ><p>OVERDUE </p></div>
                        </td>
                        <td>
                            <div id="editLink" class="tablink editLink" ><p>EDIT</p></div>
                        </td>
                        <td>
                            <div class="tablink tablinkSearchBar"><input class="addBorderCurve searchBarElement" type="search" placeholder="search..."><img class="alignInSearchBar addBorderCurve" src="./res/search.png" width="20" height="20" alt="default"></div>
                        </td>
                        <td>
                            <div class="tablink tablinkProfile"><center><div class="roundEdgeComplete"><center><img src="./res/defaultUser.png" width="51" height="53" alt="default"></center></div></center>  </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="mainItems addBottomLeftCurve addBottomRightCurve">
                <div class="sideAction arrangeVertically">
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>BORROW BOOK:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Find it using search bar</li>
                            <li>borrow book prompt</li>
                        </ul>
                    </div>
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>ADD BOOK:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Find it using search bar</li>
                            <li>add book prompt</li>
                        </ul>
                    </div>
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>EDIT BOOK:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Find it using search bar</li>
                            <li>edit book prompt</li>
                        </ul>
                    </div>
                </div>
                <div class="groupTabcontent">
                    <div class="factCardOne addBorderCurve displayShadow">
                        <p>BOOKS</p><hr><center><p>44</p></center>
                    </div>
                    <div class="factCardTwo addBorderCurve displayShadow">
                        <p>BORROWS</p><hr><center><p>4</p></center>
                    </div>
                    <div class="factCardThree addBorderCurve displayShadow">
                        <p>CATEGORIES</p><hr><center><p>13</p></center>
                    </div>
                    <div class="factCardFour addBorderCurve displayShadow">
                        <p>AUTHORS</p><hr><center><p>49</p></center>
                    </div>

                </div>
            </div>
            <div class="bottomSide">
                <center>
                    <p>Book MS 2021</p><span>&copy;</span>
                </center>
            </div>
        </div>`

const clientAdd = `<div class="root">
            <div class="topSide" >
                <div class="leftNav" onclick="window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/index.html'">
                    <img class="addBorderCurve backImage" alt="back" src="./res/back.png">
                </div>
                <div class="mainNav">
                    <div class="alignIconHomeResults" title="A library management system">
                        <img class="mainIconImage" src="./res/shelf.png" alt="icon">
                    </div>
                </div>
            </div>
            <div class="groupTablink addTopLeftCurve addTopRightCurve ">
                <table>
                    <tr>
                        <td>
                            <div id="availableLink" class="tablink availableLink" ><p>AVAILABLE </p></div>
                        </td>
                        <td>
                            <div id="addLink" class="tablink addLink" title="INSERT RECORDS" ><p>ADD </p></div>
                        </td>
                        <td>
                            <div id="borrowLink" class="tablink borrowLink"><p>BORROW </p></div>
                        </td>
                        <td>
                            <div id="returnLink" class="tablink returnLink"><p>RETURN </p></div>
                        </td>
                        <td>
                            <div id="overdueLink" class="tablink overdueLink" ><p>OVERDUE </p></div>
                        </td>
                        <td>
                            <div id="editLink" class="tablink editLink" ><p>EDIT</p></div>
                        </td>
                        <td>
                            <div class="tablink tablinkSearchBar"><input class="addBorderCurve searchBarElement" type="search" placeholder="search..."><img class="alignInSearchBar addBorderCurve" src="./res/search.png" width="20" height="20" alt="default"></div>
                        </td>
                        <td>
                            <div class="tablink tablinkProfile"><center><div class="roundEdgeComplete"><center><img src="./res/defaultUser.png" width="51" height="53" alt="default"></center></div></center>  </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="mainItems addBottomLeftCurve addBottomRightCurve ">
                <div class="sideAction arrangeVertically">
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>Project ISBN:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Required</li>
                            <li>15 characters long</li>
                        </ul>
                    </div>
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>REG NO:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Required</li>
                            <li>Must have numbers and text</li>
                        </ul>
                    </div>
                    <div class="helpCard addBorderCurve">
                        <center>
                            <p>DUE DATE:</p>
                        </center>
                        <ul class="myFacts">
                            <li>Default is 2 weeks</li>
                            <li>Maximum is 4 weeks</li>
                        </ul>
                    </div>
                </div>
                <div class="groupTabcontent">
                    <div id="add" class="formCard addBorderCurve arrangeHorizontal displayShadow add">
                        <form name="myAddForm" id="myAddForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="<?php echo $_POST; ?>">
                            <center><h3>ADD Project</h3><hr>
                            <table>
                                <tr>
                                    <td><label for="addISBN">Project ISBN</label></td>
                                    <td><input id="addISBN" name="addISBN" type="text" required><br></td>
                                </tr>
                                <tr>
                                    <td><label for="addCategory">Category</label></td>
                                    <td><input id="addCategory" name="addCategory" type="text"><br></td>
                                </tr>
                                <tr>
                                    <td><label for="addName">Name</label></td>
                                    <td><input id="addName" name="addName" type="text"><br></td>
                                </tr>
                                <tr>
                                    <td><label for="addAuthor">Author</label></td>
                                    <td><input id="addAuthor" name="addAuthor" type="text"><br></td>
                                </tr>
                                <tr>
                                    <td><label for="addPages">Pages</label></td>
                                    <td><input id="addPages" name="addPages" type="number"><br></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><center><input type="submit"><input type="reset"></center></td>
                                </tr>
                            </table>
                            </center>
                        </form>
                    </div>
                    <div id="borrow" class="formCard addBorderCurve displayShadow borrow">
                        <form name="myBorrowForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="<?php echo $_POST; ?>">
                            <center><h3>BORROW Project</h3><hr>
                                <table>
                                    <tr>
                                        <td><label for="borrowISBN">Project ISBN</label></td>
                                        <td><input id="borrowISBN" name="borrowISBN" type="text" required><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="BorrowDate">BorrowDate</label></td>
                                        <td><input id="BorrowDate" name="BorrowDate" type="date"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="borrowDueDate">DueDate</label></td>
                                        <td><input id="borrowDueDate" name="borrowDueDate" type="date"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="borrowRegNo">RegNo</label></td>
                                        <td><input id="borrowRegNo" name="borrowRegNo" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="borrowStudentName">StudentName</label></td>
                                        <td><input id="borrowStudentName" name="borrowStudentName" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><center><input type="submit"><input type="reset"></center></td>
                                    </tr>
                                </table>
                            </center>
                        </form>
                    </div>
                    <div id="returnItem" class="formCard addBorderCurve displayShadow returnItem">
                        <form id="myReturnForm" name="myReturnForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="<?php echo $_POST; ?>">
                            <center><h3>RETURN Project</h3><hr>
                                <table>
                                    <tr>
                                        <td><label for="returnISBN">Project ISBN</label></td>
                                        <td><input id="returnISBN" name="returnISBN" type="text" required><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="BorrowDate">ReturnDate</label></td>
                                        <td><input id="BorrowDate" name="BorrowDate" type="date"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label>Feedback</label></td>
                                        <td>
                                            <form name="returnContentFeedback" action="<? echo $_SERVER['PHP_SELF']; " method="<?php echo $_POST; ?>">
                                                <select>
                                                    <option name="returnProjectFeedback" type="date" value="1" selected>[Select an option]</option>
                                                    <option name="returnProjectFeedback" type="date" value="2" >No Relevant Content</option>
                                                    <option name="returnProjectFeedback" type="date" value="3" >Relevant Content</option>
                                                    <option name="returnProjectFeedback" type="date" value="4" >Missing Pages</option>
                                                </select>
                                            </form>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for="returnRegNo">RegNo</label></td>
                                        <td><input id="returnRegNo" name="returnRegNo" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="returnConditionFeedback">ProjectCondition</label></td>
                                        <td>
                                            <form name="returnConditionFeedback" action="<? echo $_SERVER['PHP_SELF']; " method="<?php echo $_POST; ?>">
                                                <input id="returnProjectConditionGood" name="returnProjectConditionGood" type="radio" value="1"> Good<br>
                                                <input id="returnProjectConditionBad" name="returnProjectConditionBad" type="radio" value="2"> Bad<br>
                                            </form>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><center><input type="submit"><input type="reset"></center></td>
                                    </tr>
                                </table>
                            </center>
                        </form>
                    </div>
                    <div id="edit" class="formCard addBorderCurve arrangeHorizontal displayShadow edit">
                        <form name="myEditForm" id="myEditForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="<?php echo $_POST; ?>">
                            <center><h3>EDIT Project</h3><hr>
                                <table>
                                    <tr>
                                        <td><label for="editISBN">Project ISBN</label></td>
                                        <td><input id="editISBN" name="editISBN" type="text" required><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="editCategory">Category</label></td>
                                        <td><input id="editCategory" name="editCategory" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="editName">Name</label></td>
                                        <td><input id="editName" name="editName" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="editAuthor">Author</label></td>
                                        <td><input id="editAuthor" name="editAuthor" type="text"><br></td>
                                    </tr>
                                    <tr>
                                        <td><label for="editPages">Pages</label></td>
                                        <td><input id="editPages" name="editPages" type="number"><br></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><center><input type="submit"><input type="reset"></center></td>
                                    </tr>
                                </table>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
            <div class="bottomSide">
                <center>
                    <p>Project MS 2021</p><span>&copy;</span>
                </center>
            </div>
        </div>`

const clientEdit = `<div class="root">
        <div class="topSide" >
            <div class="leftNav" onclick="window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/index.html'">
                <img class="addBorderCurve backImage" alt="back" src="./res/back.png">
            </div>
            <div class="mainNav">
                <div class="alignIconHomeResults" title="A library management system">
                    <img class="mainIconImage" src="./res/shelf.png" alt="icon">
                </div>
            </div>
        </div>
        <div class="groupTablink addTopLeftCurve addTopRightCurve ">
            <table>
                <tr>
                    <td>
                        <div id="availableLink" class="tablink availableLink" ><p>AVAILABLE </p></div>
                    </td>
                    <td>
                        <div id="addLink" class="tablink addLink" title="INSERT RECORDS" ><p>ADD </p></div>
                    </td>
                    <td>
                        <div id="borrowLink" class="tablink borrowLink"><p>BORROW </p></div>
                    </td>
                    <td>
                        <div id="returnLink" class="tablink returnLink"><p>RETURN </p></div>
                    </td>
                    <td>
                        <div id="overdueLink" class="tablink overdueLink" ><p>OVERDUE </p></div>
                    </td>
                    <td>
                        <div id="editLink" class="tablink editLink" ><p>EDIT</p></div>
                    </td>
                    <td>
                        <div class="tablink tablinkSearchBar"><input class="addBorderCurve searchBarElement" type="search" placeholder="search..."><img class="alignInSearchBar addBorderCurve" src="./res/search.png" width="20" height="20" alt="default"></div>
                    </td>
                    <td>
                        <div class="tablink tablinkProfile"><center><div class="roundEdgeComplete"><center><img src="./res/defaultUser.png" width="51" height="53" alt="default"></center></div></center>  </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="mainItems addBottomLeftCurve addBottomRightCurve ">
            <div class="sideAction arrangeVertically">
                <div class="helpCard addBorderCurve">
                    <center>
                        <p>Available</p>
                    </center>
                    <ul class="myFacts">
                        <li>Not Borrowed</li>
                        <li>Not Due</li>
                    </ul>
                </div>
                <div class="helpCard addBorderCurve">
                    <center>
                        <p>Borrowed</p>
                    </center>
                    <ul class="myFacts">
                        <li>Borrowed</li>
                        <li>Not Due</li>
                    </ul>
                </div>
                <div class="helpCard addBorderCurve">
                    <center>
                        <p>Overdue</p>
                    </center>
                    <ul class="myFacts">
                        <li>Borrowed</li>
                        <li>Due</li>
                    </ul>
                </div>
            </div>
            <div class="groupTabcontent">
                <div id="available" class="formCard addBorderCurve arrangeHorizontal displayShadow add">
                    <table class="output">
                        <tr class="output"><td colspan="3"><center><p>AVAILABLE BOOKS</p></center></td></tr>
                        <tr class="output">
                            <td class="output">ISBN</td>
                            <td class="output">TITLE</td>
                            <td class="output">AUTHOR</td>
                        </tr>
                        <tr class="output">
                            <td class="output">123123123</td>
                            <td class="output">The Legends Of Kora</td>
                            <td class="output">Avatar Author</td>
                        </tr>
                    </table>
                </div>
                <div id="overdue" class="formCard addBorderCurve displayShadow borrow">
                    <table class="output">
                        <tr class="output"><td colspan="3"><center><p>OVERDUE BOOKS</p></center></td></tr>
                        <tr class="output">
                            <td class="output">ISBN</td>
                            <td class="output">RegNo</td>
                            <td class="output">Due Date</td>
                        </tr>
                        <tr class="output">
                            <td class="output">123123123</td>
                            <td class="output">SCT222-2223/2021</td>
                            <td class="output">22-03-2021</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="bottomSide">
            <center>
                <p>Book MS 2021</p><span>&copy;</span>
            </center>
        </div>
    </div>`
}
}
class User{
constructor(){
this.isEmpty = false
this.myBorrowForm = document.getElementById('myBorrowForm')
this.myAddForm = document.getElementById('myAddForm')
this.myTabContents = document.getElementsByClassName('formCard')
this.myAvailableLink = document.getElementById('availableLink')
this.myAddLink = document.getElementById('addLink')
this.myBorrowLink = document.getElementById('borrowLink')
this.myReturnLink = document.getElementById('returnLink')
this.myOverdueLink = document.getElementById('overdueLink')
this.myEditLink = document.getElementById('editLink')
this.myBooks = new Array()
this.myOverdueBooks = new Array()
this.myMessages = new Array()
this.myReturnDate = new Date()
this.myIsValidBorrow = true
this.myIsValidAdd = true
}
//validation
validation(){
myBorrowForm.addEventListener('submit', function checkValues(){

})
}

//borrow
borrowProject(){
function validateBorrowedBook(){
    const borrowIsbn = myBorrowForm.borrowIsbn
    const borrowRegNo = myBorrowForm.borrowRegNo
    returnDate = myBorrowForm.borrowDueDate
    if(validLengthISBN() && validLengthRegNo() && validBorrowDate()){
        myBooks.push({
            bookISBN: borrowIsbn,
            studentRegNo: borrowRegNo,
            isBorrowed: true,
            returnDate: returnDate
        })
        window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html'
    } else {
            validLengthISBN() == false  ?  messages.push({falseLengthISBN: "Enter a valid ISBN"}) : () => { console.log(`${borrowIsbn} entered correctly`) }
            validLengthRegNo() == false ? messages.push({falseLengthRegNo: "Enter a valid ISBN"}) : () => { console.log(`${borrowRegNo} entered correctly`) }
            validBorrowDate() == false ? messages.push({falseBorrowDate: "Enter a valid ISBN"}) : () => { console.log(` ${returnDate.getDay()} - ${returnDate.getMonth()} - ${returnDate.getYear()} entered correctly`) }
        })
    }

    function validLengthISBN(){
        if(borrowIsbn.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validBorrow = false
        }
        return validBorrow
    }
    function validLengthRegNo (){
        if(borrowRegNo.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validBorrow = false
        }
        return validBorrow
    }
    function validBorrowDate(){
        if(borrowDate.getTime() < 10){
             document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
             validBorrow = false
        }
   	    return validBorrow
    }
}
}
addProject(){
//add
function validateAddBook(){
    const addIsbn = myAddForm.addIsbn
    const addRegNo = myAddForm.addRegNo
    returnDate = myAddForm.addDueDate
    if(validLengthISBN() && validLengthRegNo() && validAddDate()){
        myBooks.push({
            bookISBN: addIsbn,
            studentRegNo: addRegNo,
            isBorrowed: false,
            returnDate: returnDate
        })
        window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html'
    } else {
            validLengthISBN() == false  ?  messages.push({falseLengthISBN: "Enter a valid ISBN"}) : () => { console.log(`${addIsbn} entered correctly`) }
            validLengthRegNo() == false ? messages.push({falseLengthRegNo: "Enter a valid ISBN"}) : () => { console.log(`${addRegNo} entered correctly`) }
            validAddDate() == false ? messages.push({falseAddDate: "Enter a valid ISBN"}) : () => { console.log(` ${returnDate.getDay()} - ${returnDate.getMonth()} - ${returnDate.getYear()} entered correctly`) }
        })
    }

    function validLengthISBN(){
        if(addIsbn.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validAdd = false
        }
        return validAdd
    }
    function validLengthRegNo (){
        if(addRegNo.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validAdd = false
        }
        return validAdd
    }
    function validAddDate(){
        if(addDate.getTime() < 10){
             document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
             validAdd = false
        }
   	    return validAdd
    }
}
}
returnProject(){
//return
function validateReturnedBook(){
    const returnIsbn = myReturnForm.returnIsbn
    const returnRegNo = myReturnForm.addRegNo
    returnDate = myReturnForm.returnDueDate
    if(validLengthISBN() && validLengthRegNo() && validReturnDate()){
        myBooks.push({
            bookISBN: returnIsbn,
            studentRegNo: returnRegNo,
            isBorrowed: false,
            returnDate: returnDate
        })
        window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html'
    } else {
            validLengthISBN() == false  ?  messages.push({falseLengthISBN: "Enter a valid ISBN"}) : () => { console.log(`${returnIsbn} entered correctly`) }
            validLengthRegNo() == false ? messages.push({falseLengthRegNo: "Enter a valid ISBN"}) : () => { console.log(`${returnRegNo} entered correctly`) }
            validReturnDate() == false ? messages.push({falseReturnDate: "Enter a valid ISBN"}) : () => { console.log(` ${returnDate.getDay()} - ${returnDate.getMonth()} - ${returnDate.getYear()} entered correctly`) }
        })
    }

    function validLengthISBN(){
        if(returnIsbn.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validReturn = false
        }
        return validReturn
    }
    function validLengthRegNo (){
        if(returnRegNo.value.length < 10){
            document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
            validReturn = false
        }
        return validReturn
    }
    function validReturnDate(){
        if(returnDate.getTime() < 10){
             document.getElementById('returnDate').falseLengthISBN = falseLengthISBN
             validReturn = false
        }
   	    return validReturn
    }
}
}
overdueProject(){
//overdue
function listOverdue(){
    let i = 0
    forEach(myBooks,  i, function getOverdue() {
        myBooks[i].isBorrowed ? overdueBooks.push({ bookISBN: myBooks[i].bookISBN, studentRegNo: myBooks[i].studentRegNo }) : console.log(`${myBooks[i].bookISBN} available`)
    })
    console.log(overdueBooks)
}
}
editProject(){
//edit
function editEntry(){
    let isIn = false
    let entryIndex = null
    const editISBN = document.getElementById('editISBN')
    const editAuthor = document.getElementById('editAuthor')
    const editCategory = document.getElementById('editCategory')
    const editLength = document.getElementById('editLength')
    const editRating = document.getElementById('editRating')

    if(findEntry(editISBN.value) >= 0)
        isIn = true

    if(isIn){
        entryIndex = findEntry(editISBN.value)
        myBooks[entryIndex].bookAuthor = editAuthor.value
        myBooks[entryIndex].bookCategory = editCategory.value
        myBooks[entryIndex].bookLength = editLength.value
        myBooks[entryIndex].bookRating = editRating.value
        console.log(`${toString(myBooks[entryIndex])} changed`)
    }
    function findEntry(editISBN){
        for(let i = 0; myBooks.length; i++){
            if(myBooks[i].bookISBN === editISBN){
                return myBooks.indexOf(i)
            }
        }
    }
}
}

navigateProject(){
//navigation
function goToMain(){
    window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/index.html'
}

function goToReports(reportSection){
    window.location.href = 'file:///home/silas/Desktop/Clones/financial-MS-/indexThree.html#<%=reportSection %>'
}

function nextQn(){
    for(let i = 0; i < TabContents.length; i++){
        TabContents[i].classList.add("slide_left")
    }

}
return
}

}

class UserData extends User{
contructor(){
super()
this.isEmpty = false
}
connectProject(){
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

}
addProject(){
 function showTarget(){
            let hash = window.location.hash
            hash = hash.substring(1)
            document.getElementById(hash).style.display = "block"
        }

        availableLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexThree.html#available"
        })
        addLink.addEventListener("click", function(){
            document.getElementById("add").style.display = "block"
            document.getElementById("borrow").style.display = "none"
            document.getElementById("returnItem").style.display = "none"
            document.getElementById("edit").style.display = "none"
        })
        borrowLink.addEventListener("click", function(){
            document.getElementById("add").style.display = "none"
            document.getElementById("borrow").style.display = "block"
            document.getElementById("returnItem").style.display = "none"
            document.getElementById("edit").style.display = "none"
        })
        returnLink.addEventListener("click", function(){
            document.getElementById("add").style.display = "none"
            document.getElementById("borrow").style.display = "none"
            document.getElementById("returnItem").style.display = "block"
            document.getElementById("edit").style.display = "none"
        })
        overdueLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexThree.html#overdue"
        })
        editLink.addEventListener("click", function(){
            document.getElementById("add").style.display = "none"
            document.getElementById("borrow").style.display = "none"
            document.getElementById("returnItem").style.display = "none"
            document.getElementById("returnItem").style.display = "block"
        })
}

showProject(){
function showTarget(){
            let hash = window.location.hash
            hash = hash.substring(1)
            document.getElementById(hash).style.display = "block"
        }
        availableLink.addEventListener("click", function(){
            document.getElementById("available").style.display = "block"
            document.getElementById("overdue").style.display = "none"
        })
        addLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#add"
        })
        borrowLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#borrow"
        })
        returnLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#returnItems"
        })
        overdueLink.addEventListener("click", function(){
            document.getElementById("available").style.display = "none"
            document.getElementById("overdue").style.display = "block"
        })
        editLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#edit"
        })
}
editProject(){
 availableLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexThree.html#available"
        })
        addLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#add"
        })
        borrowLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#borrow"
        })
        returnLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexTwo.html#returnItems"
        })
        overdueLink.addEventListener("click", function(){
            window.location.href = "file:///home/silas/Desktop/Clones/financial-MS-/indexThree.html#overdue"
        })
}
}
