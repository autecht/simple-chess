/**Contains function to validate usernames entered on form. */

/* Displays error messages based on whether usernames are valid.

    return boolean reflecting usernames' validity (do not match, greater  than
    2 characters, consist of letters and/or numbers)
*/
function validateNames(){
    if(validateName1() && validateName2()){ 
        return true; // both usernames are valid
    }
    else{
        document.getElementById("errorMessage").innerHTML = "Invalid usernames";
        return false;
    }
}
/* Displays message next to Player 1 username based on validity.

    return boolean reflecting username validity (greater  than 2 characters, 
    consists of letters and/or numbers).
*/
function validateName1(){
    const regex = /^[A-Za-z1-9]{3,}$/;
    var username1 = document.forms["signIn"]["username1"].value;
    const matchesFormat = regex.test(username1);
    if(matchesFormat){ // username valid, message and return true
        document.getElementById("player1Message").innerHTML = "Valid";
        document.getElementById("player1Message").style.color = "green";
        return true;
    }
    
    else{ // username invalid, message and return false
        document.getElementById("player1Message").innerHTML = "Must at least 3 letters and/or numbers";
        document.getElementById("player1Message").style.color = "red";
        return false;
    }
}

/* Displays message next to Player 2 username based on validity.

    return boolean reflecting username validity (greater  than 2 characters, 
    consists of letters and/or numbers, distinct from Player 1 username).
*/
function validateName2(){
    const regex = /^[A-Za-z1-9]{3,}$/;
    var username2 = document.forms["signIn"]["username2"].value;
    const matchesFormat = regex.test(username2);
    const sameUsername = username2 == document.forms.signIn.username1.value;
    
    if(!matchesFormat){ // username doesn't match valid format
        document.getElementById("player2Message").innerHTML = "Must at least 3 letters and/or numbers";
        document.getElementById("player2Message").style.color = "red";
        return false;
    }
    
    else if(sameUsername){ // usernames not distinct
        document.getElementById("player2Message").innerHTML = "Must be distinct from Player 1";
        document.getElementById("player2Message").style.color = "red";
        return false;
    }
    else{ // usernames valid
        document.getElementById("player2Message").innerHTML = "Valid";
        document.getElementById("player2Message").style.color = "green";
        return true;
    }
}
