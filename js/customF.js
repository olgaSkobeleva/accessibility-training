
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

    var invalid = [],
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

    formReqFields.forEach(function(field){
        
        var fieldValue = field.value,
            label = field.parentElement.previousElementSibling.textContent,
            helpTxt;
                    
        if (fieldValue.length == 0) {
            helpTxt = "Please fill in " + label;
            successErrorHandler(field, helpTxt, invalid);
        }

        
        else {

            switch (field.id) {
                case "username":                
                    var found = users.some(function (el) {
                        return el.nik === fieldValue;
                    });

                    if (!found) { 
                        user.nik = fieldValue;
                        successErrorHandler(field);
                    }
                    else {
                        helpTxt = "This username is not available. Please create another one";
                        successErrorHandler(field, helpTxt, invalid);
                    }
                    break;

                case "your-name":
                    user.name = fieldValue;    
                    successErrorHandler(field);
                    break;
                
                case "last-name":
                    user.name += fieldValue;
                    
                    var found = users.some(function (el) {
                        return el.name === fieldValue;
                    });

                    var year = document.querySelector("#year");

                    if (!found) { 
                        user.name = fieldValue;
                        successErrorHandler(field);
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
                        successErrorHandler(field);
                    }
                    else {
                        helpTxt = "Please enter valid year of birth, ex. 1987";
                        successErrorHandler(field, helpTxt, invalid);
                    }                    
                    break;    
                
                case "phone":
                    var reg = /^\d+$/;
                    
                    if (reg.test(String(fieldValue).toLowerCase())) {
                        user.phone = fieldValue;
                        successErrorHandler(field);
                    }
                    else {
                        helpTxt = "Please enter valid phone number, ex. 22266677";
                        successErrorHandler(field, helpTxt, invalid);
                    }
                    break;
                
                case "your-email":
                    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    
                    if (reg.test(String(fieldValue).toLowerCase())) {
                        successErrorHandler(field);
                    }
                    else {
                        helpTxt = "Please enter valid email, ex. hello@hello.com";
                        successErrorHandler(field, helpTxt, invalid);
                    }
                    break;           
            }
                        
        }
        
    });
    
    
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
        
}


function successErrorHandler(field, helpTxt, invalid) {
    var helpTxt = helpTxt,
        label = field.parentElement.previousElementSibling.textContent;
        iconRight = field.nextElementSibling.nextElementSibling.children[0],
        fieldHelp = field.parentElement.nextElementSibling;

    if (invalid) {
        fieldHelp.classList.add("is-danger");
        fieldHelp.classList.remove("is-success");
            
        field.classList.add("is-danger");
        field.classList.remove("is-success");
        field.setAttribute("aria-invalid", true);
        
        iconRight.classList.remove("fa-check");
        iconRight.classList.add("fa-exclamation-triangle");
        
        invalid.push(field);        
    }

    else {
        field.classList.remove("is-danger");
        field.classList.add("is-success");
        field.removeAttribute("aria-invalid");
            
        fieldHelp.classList.add("is-success");
        fieldHelp.classList.remove("is-danger");
        
        iconRight.classList.add("fa-check");
        iconRight.classList.remove("fa-exclamation-triangle");

        helpTxt = "Value accepted";    
    }

    fieldHelp.innerHTML = helpTxt;    
}


