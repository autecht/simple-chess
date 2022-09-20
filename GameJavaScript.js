/*
    Contains functions, and variables to store info, to display appropriate
    names, move pieces, and highlight squares.
*/


var lastClicked = ""; // stores id of last clicked square
var pieceSelected = false; // whether there is currently a piece selected

/* Sets usernames based on names from form. */
function signIn(){
    const urlInfo = window.location.search;
    const usernames = getNames(urlInfo);
    const firstName = usernames[0];
    const secondName = usernames[1];

    document.getElementById("player1").innerHTML = firstName;
    document.getElementById("player2").innerHTML = secondName;
}

/* 
    Finds and separates usernames from larger string.

    @param urlInfo: string returned from window.location.search 
    containing both usernames
    return list where 0th element is first username, 
    and 1st element is second username.
*/
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
/*
    Highlights selected square and moves or selects piece (based on whether 
    piece was selected), updating lastClicked and pieceSelected.

    @param square: id of square selected
*/
function select(square){
    changeBorderedSquare(square);
    if(!pieceSelected){ // need to register a piece is now selected
        pieceSelected = true;
    }
    else{ // need to move piece to desired square
        move(square);
        pieceSelected = false;
    }
    lastClicked = square;  
}

// removes distinct border from previous square and adds it to selected one
/*
    Removes distinct border from previous square and adds it to selected one.

    @param square: id of square selected.
*/
function changeBorderedSquare(square){
    if(lastClicked != ""){ // no border to remove on first click
        document.getElementById(lastClicked).style.border="";
    }
    document.getElementById(square).style.border="2px solid black"; 
}


// removes piece from previous square and places it on selected square
/*
    Removes piece from previous square and places it on selected square.

    @param square: id of square selected.
*/
function move(square){
    document.getElementById(square).innerHTML 
            = document.getElementById(lastClicked).innerHTML;
    document.getElementById(lastClicked).innerHTML = "";
}
