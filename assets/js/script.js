// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


//global variables for the types of characters
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var numbers = "012345689";
var specialChar = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~\"";

//promptUser Object for boolean prompts and length of password prompt
var promptUser =  {
  lenOfPassword: 0, //length of Password
  //boolean for character types prompts (lower case, upper case, numbers, special characters)
  lowCase: false,
  upCase: false,
  nums: false,
  special: false,
  //declare total char string of chosen character types
  stringOfChar: "",
  askForLength: function () { //prompt length of password with validation of values between 8-128
    var value = prompt("Pick between 8 - 128 for length of characters required in the Password: ","input number here");
    if (parseInt(value) >= 8 && parseInt(value) <= 128) {
      this.lenOfPassword = parseInt(value);
    } else if (value === null || value === "" || value === "input number here") { //return 0 if "Cancel" or no input from user
      this.lenOfPassword = 0;
    } else {
      alert("Please enter a value between 8 - 128 or hit Cancel to abort.");
      this.askForLength(); //recursive - ask again
    }
  },
  askLowCase: function () { //prompt if true concat global string alphabet
    this.lowCase = confirm("Allow lower case alphabet?");
    if (this.lowCase) {
      this.stringOfChar += alphabet;
    }
  },
  askUpCase: function () { //prompt if true concat global string alphabet.toUpperCase()
    this.upCase = confirm("Allow upper case alphabet?");
    if (this.upCase) {
      this.stringOfChar += alphabet.toUpperCase();
    }
  },
  askNums: function () { //prompt if true concat global string numbers
    this.nums = confirm("Allow numbers?");
    if (this.nums) {
      this.stringOfChar += numbers;
    }
  },
  askSpecial: function () { //prompt if true concat global string specialChar
    this.special = confirm("Allow special characters?");
    if (this.special) {
      this.stringOfChar += specialChar;
    }
  }
};


//generatePassword function return string 
function generatePassword() {
  
  //declare empty array and empt password string
  var userArray = [];
  var passwordString = ""; 
  
  //ask user for criteria
  promptUser.askForLength();
  //if user cancelled when asked length of password then return empty string to kill function 
  if (promptUser.lenOfPassword === 0) {
    return "";
  }
  promptUser.askLowCase();
  promptUser.askUpCase();
  promptUser.askNums();
  promptUser.askSpecial();

  //validate if the user selected atleast one character type or not, if not call generatePassword again
  if(!(promptUser.lowCase || promptUser.upCase || promptUser.nums || promptUser.special)) {
    
    alert("Please choose atleast one character type");
    //recursively call generatePassword() until success then pass the string on return to kill the function
    passwordString = generatePassword();
    return passwordString;
  }

  //loops through the available character string and add to an Array
  for (var i = 0; i < promptUser.stringOfChar.length; i++) {
    userArray.push(promptUser.stringOfChar.charAt(i));
  }
  
  //loop and concat a randomly generated character from userArray of characters up to password length
  var passwordString = "";
  for (var i = 0; i < promptUser.lenOfPassword; i++) {
    var randomNo = Math.floor(Math.random()*userArray.length);
    passwordString += userArray[randomNo];
  }
  
  //reset the character types and empty userArray for the next password generation
  promptUser.stringOfChar = "";
  userArray = []; 
  return passwordString;
}

