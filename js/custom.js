(function() {
  var burger = document.querySelector(".burger");
  var navBlock = document.querySelector(".navbar");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    navBlock.classList.toggle("is-active");
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
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
