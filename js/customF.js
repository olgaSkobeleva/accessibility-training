
  

var nikNames = [];
var firstNames = [];
var invalid = [];


function formValidation() {


    // Nik 

    var nikField = document.querySelector("#username"),
    nik = nikField.value,
    nikHelp = nikField.parentElement.nextElementSibling,
    helpTxt,
    iconCheck = document.createElement("span");
    iconCheck.className = "icon is-small is-right";
    iconCheck.innerHTML = "<span class=\"fas fa-check\" aria-hidden=\"true\"></span>";

        
    if (nik.length == 0 || nikNames.indexOf(nik) >= 0) {
    
        helpTxt = (nik.length == 0) ? "Please fill the field Username" : "This username is not available. Please create another one";

        nikHelp.classList.add("is-danger");
        nikHelp.classList.remove("is-success");
            
        nikField.classList.add("is-danger");
        nikField.classList.remove("is-success");
        nikField.setAttribute("aria-invalid", true);
        

        invalid.push(nikField);
    

    }
    
    else {
        nikNames.push(nik);
        nikField.classList.remove("is-danger");
        nikField.classList.add("is-success");
        nikField.removeAttribute("aria-invalid");
        
        helpTxt = "Value accepted";
        nikHelp.classList.add("is-success");
        nikHelp.classList.remove("is-danger");
        
        nikField.parentElement.appendChild(iconCheck);  // change to Triangle on error
    }

    nikHelp.innerHTML = helpTxt;
    

    // Name 

    var nameField = document.querySelector("#your-name"),
    fName = nameField.value,
    fNameHelp = nameField.parentElement.nextElementSibling;

    if (fName.length == 0 && firstNames.length == 0) {
        helpTxt = "Please fill the field First name";

        fNameHelp.classList.add("is-danger");
        fNameHelp.classList.remove("is-success");
            
        nameField.classList.add("is-danger");
        nameField.classList.remove("is-success");
        nameField.setAttribute("aria-invalid", true);

        invalid.push(nameField);
    }

    else {
        nameField.removeAttribute("aria-required");
        nameField.parentElement.parentElement.classList.remove("required");

        firstNames.push(fName);
        nameField.classList.remove("is-danger");
        nameField.classList.add("is-success");
        nameField.removeAttribute("aria-invalid");
        
        helpTxt = "Value accepted";
        fNameHelp.classList.add("is-success");
        fNameHelp.classList.remove("is-danger");
        
        nameField.parentElement.appendChild(iconCheck);  // change to Triangle on error
    }

    fNameHelp.innerHTML = helpTxt;
    



    // focus first invalid
    if (invalid.length > 0) {
        invalid[0].focus();
    }
    
    

    
}

    


  







