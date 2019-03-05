var users = [];
var invalid = [];
var user = {};
var checkYear = false;


var username = document.querySelector("#username");
var fName = document.querySelector("#your-name");
var lName = document.querySelector("#last-name");
var year = document.querySelector("#year");
var phone = document.querySelector("#phone");
var address = document.querySelector("#address");
var email = document.querySelector("#your-email");
var focusMsg = document.querySelector("#focus-info");
var helpTxt;
var isInvalid;
var mailValid = false;

var mailValResult = document.createElement("p");
mailValResult.setAttribute("id", "mailValidationResult");
mailValResult.setAttribute("aria-live", "polite");
document.querySelector("#mainForm").append(mailValResult);


email.addEventListener("blur", function() {
    mailValResult.innerText = "";
    focusMsg.innerText = "";

    iconRight = this.nextElementSibling.nextElementSibling.children[0],
    fieldHelp = this.parentElement.nextElementSibling;
    
    fieldHelp.innerText = "Email validation has started. Please wait, it can take some time";
    fieldHelp.classList.add("is-validationmsg");
    fieldHelp.classList.remove("is-danger");
    fieldHelp.classList.remove("is-success");


    this.classList.add("is-validationmsg");
    this.classList.remove("is-danger");
    this.classList.remove("is-success");
    

    if (!mailValid) {
        email.focus();

        email.onfocus = function() {
            email.onkeyup = function(e) {
                if(e.which == 9) {
                    focusMsg.innerText = "Please don't move focus until validation ends";
                }
            }
        };
    }
        
    setTimeout(function() {
        
        if (validateMail(email)) {
            mailValResult.innerText = "Mail validated, value accepted";
        }
        else {
            mailValResult.innerText = "Mail validated, value not accepted";
            // email.focus();
        }
        
        focusMsg.innerText = "";

    }, 5000)
});


function formValidation() {
    user = {
        "nik": "",
        "name": "",
        "year": "",
        "phone": "",
        "address": "",
        "email": "",
        "zipcode": ""   
    };

    invalid = [];
    errorsAlert = document.querySelectorAll(".errors-alert");

    if (errorsAlert.length) {
        errorsAlert[0].remove();
    }

    var listOfErrors = document.createElement("ol"),
        errorsTitle = document.createElement("p"),
        errorsBlock = document.createElement("div");

    errorsTitle.innerText = "Error! The form could not be submitted due to invalid entries. Please fix the following:";
    errorsTitle.setAttribute("class", "title is-4");
    errorsBlock.setAttribute("class", "errors-alert");
    errorsBlock.setAttribute("tabindex", "-1");

    document.querySelector("#mainForm").parentElement.prepend(errorsBlock);

    
    
 
    // check condition for each field type
    validateUsername(username);
    validateName(fName);
    validateLastName(lName);
    validateYear(year);
    validatePhone(phone);
    validateAddress(address);
    validateMail(email);
 
    if (invalid.length > 0) {
        invalid[0].focus(); // to focus first invalid, but currently focus to the List of errors (below)

        // list of errors:
        invalid.forEach(function(el) {
            var link = document.createElement("a");
            link.setAttribute("href", "#" + el.id);
            link.innerHTML = el.placeholder;

            var linkItem = document.createElement("li");
            linkItem.append(link);
            listOfErrors.append(linkItem);
        });

        errorsBlock.append(errorsTitle);
        errorsBlock.append(listOfErrors);
        errorsBlock.focus();
        
    }

    else {
        users.push(user);
        alert("Your profile has been created, data has been saved");
    }

    // console.log(users);
        
}

function isEmpty(field) {
    var fieldValue = field.value,
    label = field.parentElement.previousElementSibling.textContent;
    isInvalid = false;
    
    if (fieldValue.length == 0) {
        helpTxt = "Please fill in " + label;
        isInvalid = true;
        mailValid = false;
        successErrorHandler(field, helpTxt, isInvalid);

        return true;
    }
};

function validateUsername(field) {
    var fieldValue = field.value;
    isInvalid = false;
    
    if (!isEmpty(field)) {
        var found = users.some(function (el) {
            return el.nik === fieldValue;
        });
    
        if (!found) { 
            user.nik = fieldValue;
        }
        else {
            helpTxt = "This username is not available. Please create another one";
            isInvalid = true;
        }
        
        successErrorHandler(field, helpTxt, isInvalid);
    }    
}

function validateName(field) {
    var fieldValue = field.value;
    isInvalid = false;
    mailValid = false;

    if (!isEmpty(field)) {
        user.name = fieldValue;    
        successErrorHandler(field);
    }
    
}

function validateLastName(field) {
    var fieldValue = field.value;
    isInvalid = false;
    
    if (!isEmpty(field)) {
        var fullName = user.name + " " + fieldValue;
                            
        var found = users.some(function (el) {
            return el.name === fullName;
        });

        var year = document.querySelector("#year");

        if (!found) { 
            user.name = fullName;
            successErrorHandler(field);
            year.setAttribute("aria-disabled", true);
            year.removeAttribute("aria-required");
        }
        else {
            alert("User with same name already exists. Please fill in year of birth, exapmple 1999");
            year.removeAttribute("aria-disabled");
            year.setAttribute("aria-required", true);
            year.focus();
            checkYear = true;
        }
    }
    
}

function validateYear(field) {
    var reg = /(?:(?:19|200)[0-9]{1})/;
    var fieldValue = field.value;
    isInvalid = false;

    if (checkYear) {
        if (!isEmpty(field)) {
        
            if (reg.test(String(fieldValue).toLowerCase())) {
                user.year = fieldValue;
            }
            else {
                helpTxt = "Please enter valid year of birth, ex. 1987";
                isInvalid = true;
            }  
            successErrorHandler(field, helpTxt, isInvalid);
        }       
    }
      
}

function validatePhone(field) {
    var fieldValue = field.value;
    var reg = /^\d+$/;
    isInvalid = false;

    if (!isEmpty(field)) {
                     
        if (reg.test(String(fieldValue).toLowerCase())) {
            user.phone = fieldValue;
        }
        else {
            helpTxt = "Please enter valid phone number, ex. 22266677";
            isInvalid = true;
        }
        successErrorHandler(field, helpTxt, isInvalid);
    }         
}

function validateAddress(field) {
    var fieldValue = field.value;
    isInvalid = false;

    if (!isEmpty(field)) {
        user.address = fieldValue;    
        successErrorHandler(field, helpTxt, isInvalid);
    }
    
}

function validateMail(field) {
    var fieldValue = field.value;
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isInvalid = false;
    mailValid = true;
    

    if (!isEmpty(field)) {

        if (!reg.test(String(fieldValue).toLowerCase())) {
            helpTxt = "Please enter valid email, ex. hello@hello.com";
            isInvalid = true;
            mailValid = false;
        }

        else {
            var found = users.some(function (el) {
                return el.email === fieldValue;
            });

            if (!found) { 
                user.email = fieldValue;
            }
            else {
                helpTxt = "This email is already registered. Please enter another one";
                isInvalid = true;
                mailValid = false;
            }
        }        

        successErrorHandler(field, helpTxt, isInvalid);        
    }
    
    return mailValid;
}

function successErrorHandler(field, helpTxt, isInvalid) {
    var helpTxt = helpTxt;
    
    iconRight = field.nextElementSibling.nextElementSibling.children[0],
    fieldHelp = field.parentElement.nextElementSibling;

    if (isInvalid) {
        fieldHelp.classList.add("is-danger");
        fieldHelp.classList.remove("is-success");
        fieldHelp.classList.remove("is-validationmsg");
            
        field.classList.add("is-danger");
        field.classList.remove("is-success");
        field.classList.remove("is-validationmsg");
        field.setAttribute("aria-invalid", true);
        
        iconRight.classList.remove("fa-check");
        iconRight.classList.add("fa-exclamation-triangle");
        
        invalid.push(field);    
    }

    else {
        field.classList.remove("is-danger");
        field.classList.remove("is-validationmsg");
        field.classList.add("is-success");
        field.removeAttribute("aria-invalid");
            
        fieldHelp.classList.add("is-success");
        fieldHelp.classList.remove("is-validationmsg");
        fieldHelp.classList.remove("is-danger");
        
        iconRight.classList.add("fa-check");
        iconRight.classList.remove("fa-exclamation-triangle");

        helpTxt = "Value accepted";    
    }

    fieldHelp.innerText = helpTxt;   
        
}