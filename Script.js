var lastClicked = ""; // stores id of last clicked square
var pieceSelected = false;

/* Returns boolean based on whether usernames are valid. Displays appropriate
    error messages.*/
function validateNames(){
    if(validateName1() && validateName2()){ // both usernames are valid
        return true;
    }
    else{
        document.getElementById("errorMessage").innerHTML = "Invalid usernames"
        return false;
    }
}

function validateName1(){
    const regex = /^[A-Za-z1-9]{3,}$/;
    var username1 = document.forms["signIn"]["username1"].value;
    const matchesFormat = regex.test(username1);
    if(matchesFormat){
        document.getElementById("player1Message").innerHTML = "Valid";
        document.getElementById("player1Message").style.color = "green";
        return true;
    }
    
    else{
        document.getElementById("player1Message").innerHTML = "Must at least 3 letters and/or numbers";
        document.getElementById("player1Message").style.color = "red";
        return false;
    }
}


function validateName2(){
    const regex = /^[A-Za-z1-9]{3,}$/;
    var username2 = document.forms["signIn"]["username2"].value;
    const matchesFormat = regex.test(username2);
    const sameUsername = username2 == document.forms.signIn.username1.value;
    if(!matchesFormat){
        document.getElementById("player2Message").innerHTML = "Must at least 3 letters and/or numbers";
        document.getElementById("player2Message").style.color = "red";
        return false;
    }
    
    else if(sameUsername){ // usernames should be distinct
        document.getElementById("player2Message").innerHTML = "Must be distinct from Player 1";
        document.getElementById("player2Message").style.color = "red";
        return false;
    }
    else{
        document.getElementById("player2Message").innerHTML = "Valid";
        document.getElementById("player2Message").style.color = "green";
        return true;
    }
}

function signIn(){ // sets names of game page
    const urlInfo = window.location.search;
    const usernames = getNames(urlInfo);
    const firstName = usernames[0];
    const secondName = usernames[1];

    document.getElementById("player1").innerHTML = firstName;
    document.getElementById("player2").innerHTML = secondName;
}

/* Given string from window.location.search, returns array where 0th element
    is first username, and 1st element is second username.*/
function getNames(urlInfo){
    var firstName;
    var secondName;
    var i = 1;
    var firstNameBegin = urlInfo.indexOf("=") + 1;
    var firstNameEnd = urlInfo.indexOf("&") - 1;
    var secondNameBegin = urlInfo.indexOf("=", firstNameBegin) + 1;

    firstName = urlInfo.slice(firstNameBegin,firstNameEnd + 1);
    secondName = urlInfo.slice(secondNameBegin, urlInfo.length); 

    return [firstName, secondName];  
}




// highlights selected square and moves or selects piece, updating lastClicked and pieceSelected
function select(square){
    changeBorderedSquare(square);
    if(!pieceSelected){
        pieceSelected = true;
    }
    else{
        move(square);
        pieceSelected = false;
    }
    lastClicked = square;  
}

// removes distinct border from previous square and adds it to selected one
function changeBorderedSquare(square){
    if(lastClicked != ""){
        document.getElementById(lastClicked).style.border="";
    }
    document.getElementById(square).style.border="2px solid black"; 
}


// removes piece from previous square and places it on selected square
function move(square){
    document.getElementById(square).innerHTML = document.getElementById(lastClicked).innerHTML;
    document.getElementById(lastClicked).innerHTML = "";
}
