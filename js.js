window.onload=function(){
var canvas = document.getElementById("mainCanvas"), //Declaring variable -- get the canvas
    clText = document.getElementById("clText"), //Get the textare for custom text
    canvasDraw = canvas.getContext("2d"), //get the 2d canvas context - alowing drawing on the canvas
    quit = false, //variable used to see if the quitscreen is open
    time = 5000, //the amount of time - in milliseconds - you have per round by default
    endTime = new Date().getTime() + time, //the expected time that you will die - will be changed everytime you hit the correct key
    keyPressed, //the key currently pressed
    letters = new Array(), //the letters the user have to input - 5 long, 0 is the current key, 4 is the fifth
    lettercount = 0, //the amount of correct letters typed
    customLetters = false, //used to see if the user has chosen to use a custom string
    customLettersArr = new Array(), //the array of custom numbers
    claPoint = 0, //the point in the custom letter array, we have to use
    isTyping = false, //check if the user has focus on the game or the box used to input custom letters
    correctAnswer = 0,
    livesLeft = 6;
    newRecord = false; //see if the current game has reached the highscore


// Cookie funcions

function setCookie(cname,cvalue,exdays) { //setCookie function -- used to set cookies
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) { //getCookie function -- used to check a cookie
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

//Canvas Width and Height

canvas.width = window.innerWidth; //Makes sure the canvas fits the browser window
canvas.height = window.innerHeight;// -||-
window.onresize = function(){//Makes sure the canvas fits the browser window on resize
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateCanvas();//updates the canvas with the new width and height
};


//Custom letters
 //Create the Array
function createCLA(cvalue){ //creates a usable array of characters out of the custom text the user has typed
    customLettersArr = cvalue.split(""); //splits the custom text into an array of characters
    for(i=0;i<customLettersArr.length;i++){//makes sure the spaces are removed
        if(customLettersArr[i] === " "){ //NOTE TO SELF: Make it so only A-Z (possibly 0-9) can be used - not special characters like ? or !
            customLettersArr.splice(i, 1);//if it contains a space - remove it
        }
    }
    customLetters = true; //Let the rest of the code know that you're using custom text
}
 //Set the Array
if(getCookie("text") !== ""){ //if there's anything in the custom text cookie - use it
    createCLA(getCookie("text")); //create the custom array with the cookie
    clText.value = getCookie("text"); //display the cookie in the textarea
}

//Custom Letter butons
document.getElementById("clDisable").onmousedown = function(){ //when the disable custom letters button is pushed
    if(customLetters){
        customLetters = false; //disable custom letters
        setCookie("text","",-1); //remove the custom text cookie
        createCLA(""); //remove the custom text array (NOT NEEDED)
        location.reload(); //reload
    }
};

document.getElementById("clButton").onmousedown = function(){ //when the submit button for custom text is pushed
    setCookie("text",clText.value,1); //make a cookie with the custom text
    createCLA(clText.value); //create/change the custom text array with the text
};


//Check the score / highscore

function checkScore(){ //a function to check if you've beaten your highscore
    if(!customLetters){ //don't check if you're using custom text, to prevent cheating
        if(lettercount > getCookie("highscore") || getCookie("highscore") === undefined){ //if your current score is higher than the highscore, or if there is no highscore...
            setCookie("highscore",lettercount,1000); //set the new highscore
            newRecord = true; //tell that it's anew highscore
        }
    }
}


//see whenu user is typing

clText.onfocus = function(){ //when you're typing - say you're typing
    isTyping = true;
};
clText.onblur = function(){ //when you're  no longer typing - say you're not typing anymore
    isTyping = false;
};


//Update Letters
for(i=0;i<5;i++){ //make the initial 5 characters
updateLetters(i);
}
function updateLetters(i){ //adds a character to the letter array at the point of i
    if(!customLetters){ //first piece of code is for normal - random mode, second is for custom mode
        
        //Generate Random Letters
        
	var m; //m is the random number spit out of the for loop
	var k = Math.random(); //k is random - but we can't use it, we gotta make it a character between 0 and 27
	for(j=1;j<27;j++){ //fire the code 26 times
		if(k > (1 / 26) * j){ //
			m = j + 64; //add 64 - for ease of use
		} else {
			if(j===1){m=65;}
			break;
		}
	}
	switch(m){ //see which character we have to add at point i
	case 65:
		letters[i] = 'A';
		break;
	case 66:
		letters[i] = 'B';
		break;
	case 67:
		letters[i] = 'C';
		break;
	case 68:
		letters[i] = 'D';
		break;
	case 69:
		letters[i] = 'E';
		break;
	case 70:
		letters[i] = 'F';
		break;
	case 71:
		letters[i] = 'G';
		break;
	case 72:
		letters[i] = 'H';
		break;
	case 73:
		letters[i] = 'I';
		break;
	case 74:
		letters[i] = 'J';
		break;
	case 75:
		letters[i] = 'K';
		break;
	case 76:
		letters[i] = 'L';
		break;
	case 77:
		letters[i] = 'M';
		break;
	case 78:
		letters[i] = 'N';
		break;
	case 79:
		letters[i] = 'O';
		break;
	case 80:
		letters[i] = 'P';
		break;
	case 81:
		letters[i] = 'Q';
		break;
	case 82:
		letters[i] = 'R';
		break;
	case 83:
		letters[i] = 'S';
		break;
	case 84:
		letters[i] = 'T';
		break;
	case 85:
		letters[i] = 'U';
		break;
	case 86:
		letters[i] = 'V';
		break;
	case 87:
		letters[i] = 'W';
		break;
	case 88:
		letters[i] = 'X';
		break;
	case 89:
		letters[i] = 'Y';
		break;
	case 90:
		letters[i] = 'Z';
		break;
	case 91:
		letters[i] = '91';
		break;
	default:
		break;
	}
    } else { //the custom mode
        
        //Use Custom Letters
        
        if(!customLettersArr){ //if there is no custom text - disable custom text, fire the code again and return
            customLetters = false;
            updateLetters(i);
            return;
        }
        if(claPoint >= customLettersArr.length){ //claPoint is the next point of the next character in the array, if it is beyond the length of the array, reset at 0
            claPoint = 0;
        }
        letters[i] = customLettersArr[claPoint].toUpperCase(); //add the customcharacter[i] at the position i in letters, make the character uppercase
        claPoint++; //add 1 to the claPoint
    }
}
updateCanvas(); //run updateCanvas once, initially

//Check when key is pressed
window.onkeydown = function(event){ //when a key is pressed, check what was pressed and run some code
    var key = event.keyCode; //get the key that was typed
    if(!quit){ //if you aren't dead yet

    switch(key){
    case 65: //65 - 90 = A-Z (Maybe add 0-9??)
        keyPressed = 'A';
        break;
    case 66:
        keyPressed = 'B';
        break;
    case 67:
        keyPressed = 'C';
        break;
    case 68:
        keyPressed = 'D';
        break;
    case 69:
        keyPressed = 'E';
        break;
    case 70:
        keyPressed = 'F';
        break;
    case 71:
        keyPressed = 'G';
        break;
    case 72:
        keyPressed = 'H';
        break;
    case 73:
        keyPressed = 'I';
        break;
    case 74:
        keyPressed = 'J';
        break;
    case 75:
        keyPressed = 'K';
        break;
    case 76:
        keyPressed = 'L';
        break;
    case 77:
        keyPressed = 'M';
        break;
    case 78:
        keyPressed = 'N';
        break;
    case 79:
        keyPressed = 'O';
        break;
    case 80:
        keyPressed = 'P';
        break;
    case 81:
        keyPressed = 'Q';
        break;
    case 82:
        keyPressed = 'R'; 
        break;
    case 83:
        keyPressed = 'S';
        break;
    case 84:
        keyPressed = 'T';
        break;
    case 85:
        keyPressed = 'U';
        break;
    case 86:
        keyPressed = 'V';
        break;
    case 87:
        keyPressed = 'W';
        break;
    case 88:
        keyPressed = 'X';
        break;
    case 89:
        keyPressed = 'Y';
        break;
    case 90:
        keyPressed = 'Z';
        break;
    case 8: //if you use backspace...
        keyPressed = 'none';//...say that you didn't press anything
        if(!isTyping){//if you're not typing...
            event.preventDefault();//...prevent the user from accidentaly going back
        }
        break;
    default: //if anything else is pressed, say that you didn't press anything
        keyPressed = 'none';
        break;
    }
    updateInterface(); //updateInterface, with the new information
    } else { //if you DID quit
        if(key === 32 && isTyping === false){ //if you press space, and is ready to retry (not typing)
            location.reload(); //reload
        }
    }
};

//Update Everything

function updateInterface(){//update interface, fire a bunch of functions
    if(keyPressed){ //if you actually pressed anything
        if(keyPressed === letters[0]){//and you pressed the right key
            correctAnswer = 0;
            livesLeft = 6;
            timer();//resets the countdown
            letters.shift(); //remove the first character in the array
            updateLetters(4); //add the next character in the array
            updateCanvas(); //update the canvas
            lettercount++; //add 1 to the score
        } else {
            if(!isTyping){
                correctAnswer = 15;
                livesLeft--;
                if(livesLeft===0){
                    quit = true;
                }
            }
        }
    }
}

//Draw everything on the canvas

function updateCanvas(){ //draw all the information on the canvas
    checkScore(); //check if you have reached your highscore
    canvasDraw.clearRect(0,0,canvas.width,canvas.height); //removes everything from the canvas, for us to draw on
    if(correctAnswer !== 0){
        switch(correctAnswer){
            case 1:
                canvasDraw.fillStyle = "#FFEEEE";
                break;
            case 2:
                canvasDraw.fillStyle = "#FFDDDD";
                break;
            case 3:
                canvasDraw.fillStyle = "#FFCCCC";
                break;
            case 4:
                canvasDraw.fillStyle = "#FFBBBB";
                break;
            case 5:
                canvasDraw.fillStyle = "#FFAAAA";
                break;
            case 6:
                canvasDraw.fillStyle = "#FF9999";
                break;
            case 7:
                canvasDraw.fillStyle = "#FF8888";
                break;
            case 8:
                canvasDraw.fillStyle = "#FF7777";
                break;
            case 9:
                canvasDraw.fillStyle = "#FF6666";
                break;
            case 10:
                canvasDraw.fillStyle = "#FF5555";
                break;
            case 11:
                canvasDraw.fillStyle = "#FF4444";
                break;
            case 12:
                canvasDraw.fillStyle = "#FF3333";
                break;
            case 13:
                canvasDraw.fillStyle = "#FF2222";
                break;
            case 14:
                canvasDraw.fillStyle = "#FF1111";
                break;
            case 15:
                canvasDraw.fillStyle = "#FF0000";
                break;
        }
        correctAnswer--;
        canvasDraw.fillRect(0,0,canvas.width,canvas.height);
    }
    if(!quit){ //if the game is running, and you aren't dead
        var x = canvas.width / 2; // middle of the screen
        var y = canvas.height / 8; // eights of the heightt
        for(i=0;i<5;i++){ //5 times... ..once for each character
                canvasDraw.font="80px Arial"; //set the font
                if(i===0){ //if it is the first character, make it larger and place it lower
                        y = y*2;
                        canvasDraw.font="215px Arial";
                }
                canvasDraw.fillStyle = "#000000"; //make the text black
                canvasDraw.textAlign="center"; //say that it has to draw from the center
                canvasDraw.fillText(letters[i],x,y); //draw the letter
                y = y + canvas.height / 8; //add an iteration of one eigth to the y position
                if(i === 0){y = y + canvas.height / 8;} //if it is the first time, add another
        }
        canvasDraw.font="160px Arial";
        canvasDraw.fillText(getCookie("highscore"),window.innerWidth / 5 * 4,window.innerHeight / 5); //write the highscore in the top right corner
        canvasDraw.textAlign="center";
        canvasDraw.font="180px Arial";
        canvasDraw.fillText(lettercount,(window.innerWidth / 2 + 200),window.innerHeight / 2 * 1.1); //tell him the score
        canvasDraw.fillText(livesLeft,(window.innerWidth / 2 - 400),window.innerHeight / 2 * 1.1); //tell him the score
    } else { //if you're dead
        canvasDraw.font="250px Arial";
        canvasDraw.fillStyle = "#000000";
        canvasDraw.textAlign="center";
        canvasDraw.fillText(lettercount,window.innerWidth / 2,window.innerHeight / 2 * 0.7); //display the score just above center
        canvasDraw.font="100px Arial";
        canvasDraw.fillText("[SPACE]",window.innerWidth / 2,window.innerHeight / 2 * 1.3); //display the [SPACE] just below center
        canvasDraw.font="160px Arial";
        canvasDraw.fillText(getCookie("highscore"),window.innerWidth / 5 * 4,window.innerHeight / 5); //display the highscore to the right
        if(newRecord){ //if it is a new highscore...
            canvasDraw.font="100px Arial";
            canvasDraw.fillText("New Highscore!",window.innerWidth / 2,window.innerHeight / 2 * 1); //tell the user at the center
        }
    }
}

//Timer

function timer(){ //run everytime the user answers correctly - needs a better name
    if(time > 300){ //if the user has above .3 seconds
        time = time * 0.97; //give him less time
    }
    endTime = new Date().getTime() + time; //say when the user needs to answer correctly by
}

//FPS

setInterval(function(){ //check for updates every now and then (50 times / second)
    updateCanvas(); //update the canvas
    var a = endTime - new Date().getTime(); //get the difference between when he has to complete the tast and now
    if(a > 0){ //if he still has time
	//canvasDraw.clearRect(0,0,window.innerWidth,80);
    } else { //if he hasn't
        quit = true; //say that he's dead
        updateCanvas(); //and update
    }
    if(!quit){
        canvasDraw.fillStyle = "#000000";
        canvasDraw.fillRect((window.innerWidth / 2 - 200), window.innerHeight / 8 + (window.innerHeight / 8 * 6) / time * (time-a), 10,window.innerHeight / 8 + (window.innerHeight / 8 * 6) / time * (a) - (window.innerHeight / 8)); //and make a countdown of how much time he has left
    }
},20);
};