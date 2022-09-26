/*
    Contains functions, and variables to store info, to display appropriate
    names, move pieces, and highlight squares.
*/


var lastClicked = ""; // stores id of last clicked square
var pieceSelected = false; // whether there is currently a piece selected
var extraPieceSelected = false; // string representing what piece from editor is selected

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
function selectSquare(square){
    changeBorderedSquare(square);
    if(!pieceSelected){ // need to register a piece is now selected
        var isPiece = document.getElementById(square).innerHTML.includes("img");
        if(isPiece){
            pieceSelected = true;
        }
        
    }
    else{ // need to move piece to desired square
        move(square);
        pieceSelected = false;
    }
    extraPieceSelected = false;
    lastClicked = square;  
}

/**
 * Updates variables so that next click on chess board will replace piece on
 * square with that selected from extra piece table.
 *
 * @param piece: string representing piece selected from extra piece table.
 */
function selectPiece(piece){
    changeBorderedSquare(piece);
    extraPieceSelected = true;
    pieceSelected = true;
    lastClicked = piece;
}

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



/*
    Moves selected piece to appropriate square.

    @param square: id of square selected.
*/
function move(square){
    
    if(lastClicked != "Remove"){ // to keep x in remove square from appearing on board
        document.getElementById(square).innerHTML 
                = document.getElementById(lastClicked).innerHTML;
    }
    else{
        document.getElementById(square).innerHTML = "";
    }
    
    if(extraPieceSelected){ // to avoid changing extra piece table
        return;
    }
    document.getElementById(lastClicked).innerHTML = "";
}

