
var invalid = [];

var users = [];



function formValidation() {
    var formReqFields = document.querySelectorAll("#mainForm input[aria-required]");
    
    var user = {
        "nik": "",
        "name": "",
        "year": "",
        "phone": "",
        "address": "",
        "email": "",
        "zipcode": ""   
    };
    

    formReqFields.forEach(function(field){
        // console.log(field.parentElement.previousElementSibling.textContent);

        var fieldValue = field.value,
        fieldHelp = field.parentElement.nextElementSibling,
        label = field.parentElement.previousElementSibling.textContent,
        helpTxt,
    
        iconRight = document.createElement("span");
        iconRight.className = "icon is-small is-right";
        iconRightInner = document.createElement("span");
        iconRightInner.className = "fas";
        iconRightInner.setAttribute("aria-hidden", true);

        iconRight.appendChild(iconRightInner);
        field.parentElement.appendChild(iconRight);
        
        
    
        if (fieldValue.length == 0) {
            helpTxt = "Please fill in " + label;
            errorHandler(field, fieldHelp, iconRightInner, helpTxt);
         }

        
        else {

            switch (field.id) {
                case "username":                
                    var found = users.some(function (el) {
                        return el.nik === fieldValue;
                    });

                    if (!found) { 
                        user.nik = fieldValue;
                        successHandler(field, fieldHelp, iconRightInner);
                    }
                    else {
                        helpTxt = "This username is not available. Please create another one";
                        errorHandler(field, fieldHelp, iconRightInner, helpTxt);
                    }
                    break;

                case "your-name":
                    user.name = fieldValue;    
                    successHandler(field, fieldHelp, iconRightInner);
                    break;
                
                case "last-name":
                    user.name += fieldValue;
                    
                    var found = users.some(function (el) {
                        return el.name === fieldValue;
                    });

                    var year = document.querySelector("#year");

                    if (!found) { 
                        user.name = fieldValue;
                        successHandler(field, fieldHelp, iconRightInner);
                        year.setAttribute("aria-disabled", true);
                        year.removeAttribute("aria-required");
                    }
                    else {
                        alert("User with same name already exists. Please fill in year of birth, exapmple 1999");
                        year.removeAttribute("aria-disabled");
                        year.setAttribute("aria-required", true);
                        year.focus();
                    }
                    break;

                case "year": 
                    var reg = /(?:(?:19|200)[0-9]{1})/;
                    
                    if(reg.test(String(fieldValue).toLowerCase())) {
                        user.year = fieldValue;
                        successHandler(field, fieldHelp, iconRightInner);
                    }
                    else {
                        helpTxt = "Please enter valid year of birth, ex. 1987";
                        errorHandler(field, fieldHelp, iconRightInner, helpTxt);
                    }                    
                    break;    
                
                case "phone":
                    var reg = /^\d+$/;
                    
                    if (reg.test(String(fieldValue).toLowerCase())) {
                        user.phone = fieldValue;
                        successHandler(field, fieldHelp, iconRightInner);
                    }
                    else {
                        helpTxt = "Please enter valid phone number, ex. 22266677";
                        errorHandler(field, fieldHelp, iconRightInner, helpTxt);
                    }
                    break;
                
                case "your-email":
                    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    
                    if (reg.test(String(fieldValue).toLowerCase())) {
                        successHandler(field, fieldHelp, iconRightInner);
                    }
                    else {
                        helpTxt = "Please enter valid email, ex. hello@hello.com";
                        errorHandler(field, fieldHelp, iconRightInner, helpTxt);
                    }

                    break;
            
            }
                        
        }
        
    });

    
    

    // focus first invalid
    if (invalid.length > 0) {
        console.log(invalid);
        invalid[0].focus();
    }
    else {
        users.push(user);
        // alert("Your profile has been created, data has been saved");
        // console.log(users);
    }
        
}

function errorHandler(field, fieldHelp, iconRightInner, helpTxt) {
    fieldHelp.classList.add("is-danger");
    fieldHelp.classList.remove("is-success");
        
    field.classList.add("is-danger");
    field.classList.remove("is-success");
    field.setAttribute("aria-invalid", true);
    
    iconRightInner.classList.remove("fa-check");
    iconRightInner.classList.add("fa-exclamation-triangle");
    
    invalid.push(field);

    fieldHelp.innerHTML = helpTxt;
}

function successHandler(field, fieldHelp, iconRightInner) {
    field.classList.remove("is-danger");
    field.classList.add("is-success");
    field.removeAttribute("aria-invalid");
        
    fieldHelp.classList.add("is-success");
    fieldHelp.classList.remove("is-danger");
    
    iconRightInner.classList.add("fa-check");
    iconRightInner.classList.remove("fa-exclamation-triangle");

    fieldHelp.innerHTML = "Value accepted";
}


  







