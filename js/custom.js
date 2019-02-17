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

  navEl.onkeyup = function(event) {
    toggleTabKeyboard(this.id, event);
  };
});

document.querySelector(".toggleSkipnav").onclick = function() {
  this.parentNode.classList.toggle("is-active");
};

function toggleTabKeyboard(selectedNav, event) {
  
  var idToActivate = selectedNav.slice(3);
  var currentTab = document.querySelector("#" + selectedNav);
  var tabToActivate = "";

  if (event.which == 37) {
    idToActivate --;
  } else {
    if (event.which == 39) {
      idToActivate ++;
    }
  }
  
  tabToActivate = document.querySelector("#tab" + idToActivate);

  toggleTab(tabToActivate.id, tabToActivate.dataset.target);
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
      tab.removeAttribute("tabindex");
    } else {
      tab.style.display = "none";
      tab.setAttribute("tabindex", 0);
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
