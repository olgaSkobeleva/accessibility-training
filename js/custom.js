(function() {
  var burger = document.querySelector(".burger");
  var navBlock = document.querySelector(".navbar");
  var menu = document.querySelector("#" + burger.dataset.target);
  var mainMenuItems = document.querySelectorAll("#navbarMenu .navbar-item a");
  burger.addEventListener("click", function() {
    navBlock.classList.toggle("is-active");
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");

    mainMenuItems.forEach(function(item) {
      if (burger.classList.contains("is-active")) {
        burger.setAttribute("aria-expanded", true);
        item.setAttribute("tabindex", "-1");
        
        burger.onkeyup = function(event) {
          if (event.which == 32 || 13 ) { 
            mainMenuItems[0].setAttribute("tabindex", 0);
            mainMenuItems[0].focus();
          }
        }
      }
      else {
        burger.setAttribute("aria-expanded", false);
        item.removeAttribute("tabindex");
      } 

      item.onkeyup = function(event) {
        var elToFocus;
        var menuList = item.parentElement.parentElement;

        switch (event.which) {
          case 40:
            elToFocus = item.parentElement === menuList.lastElementChild ? menuList.firstElementChild.firstElementChild : item.parentElement.nextElementSibling.firstElementChild;  
            break;

          case 38:
            elToFocus = item.parentElement === menuList.firstElementChild ?
            menuList.lastElementChild.firstElementChild : item.parentElement.previousElementSibling.firstElementChild; 
            break;
        }

        item.setAttribute("tabindex", "-1");
        item.blur();
        elToFocus.setAttribute("tabindex", 0);
        elToFocus.focus();  
      }
    });
  });

  setInterval(function(){addFakeMessage()}, 10000);

  

})();



document.querySelectorAll("#nav button").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };

  navEl.onkeydown = function(event) {
    toggleTabKeyboard(this.id, event);
  };
});

document.querySelector(".toggleSkipnav").onclick = function() {
  this.parentNode.classList.toggle("is-active");
};

function toggleTabKeyboard(selectedNav, event) {
  var idToActivate = selectedNav.slice(3);
  var currentTab = document.querySelector("#" + selectedNav);
  var tabList = document.querySelector(".tab-list");
  
  switch (event.which) {
    case 37:
      tabList.firstElementChild === currentTab ? idToActivate = tabList.lastElementChild.id.slice(3) : idToActivate --;
      break;
  
    case 39:
      tabList.lastElementChild === currentTab ? idToActivate = 1 : idToActivate ++;
      break;
    
    case 36:
      idToActivate = 1;
      event.preventDefault();
      break;
    
    case 35:
      idToActivate = tabList.lastElementChild.id.slice(3);
      event.preventDefault();
      break;
  }
  
  var tabToActivate = document.querySelector("#tab" + idToActivate);
  currentTab.blur();
  tabToActivate.focus();    
}

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav button");
  
  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute("aria-selected", true);
      navEl.setAttribute("tabindex", "");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute("aria-selected", false);
        navEl.setAttribute("tabindex", "-1");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}

function addFakeMessage() {
  var msg = document.createElement("div"),
      postsContainer = document.querySelector("#posts-container");
  
  msg.className = "post fake";
  
  msg.innerHTML = '<h4>DYNAMIC: This should be heard when added</h4>';

  postsContainer.insertBefore(msg, postsContainer.children[0]);
}
