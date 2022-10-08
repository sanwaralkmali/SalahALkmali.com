"use strict"; // strict mode

// *************************************************************** \\

// *******************  Dark Mode , Light Mode ******************* \\

// *************************************************************** \\
let moon = document.querySelector("#moon");
let sun = document.querySelector("#sun");
let header = document.querySelector("#header");

moon.addEventListener("click", function() {
    moon.style.opacity="0";
    sun.style.opacity="1";
    header.classList.remove("header-dark");
    header.classList.add("header-light");

});

sun.addEventListener("click", function() {
    moon.style.opacity="0.9";
    sun.style.opacity="0";
    header.classList.remove("header-light");
    header.classList.add("header-dark");

});

// *********************************************************** \\

// *****************  header text animation ****************** \\

// *********************************************************** \\

let profile_text = document.getElementById('profile-text');

let profile_text_values = ["I am a Web Developer!",
    "I am a Math Teacher!",
    "I am a Music Lover!",
];

let len = profile_text_values[0].length + profile_text_values[1].length + profile_text_values[2].length;
let time = len*100;
let profile_text_index = 0;

let profile_text_interval = setInterval(function () {
    let current_sentence = profile_text_values[profile_text_index];
    if(profile_text.innerHTML == ""){
        profile_text.style.opacity = "0";
    }
    else {
        profile_text.style.opacity = "1";
    }

    for (let i = 0; i < current_sentence.length; i++) {
        setTimeout(function () {
            profile_text.innerHTML += current_sentence[i];
        }, 200 * i);
    }
    profile_text.innerHTML = "";
    profile_text_index++;
    if (profile_text_index >= profile_text_values.length) {
        profile_text_index = 0;
    }
    time = 300 * len;

}, time);

// *********************************************************** \\

// *****************  Fixed nav bar ****************** \\

// *********************************************************** \\


window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// *********************************************************** \\
let nav_menu = document.querySelector("#nav-menu");
let nav_menu_item = document.getElementById("responsive-navbar");

nav_menu.addEventListener("click", function() {
    nav_menu_item.classList.toggle("show");
}
);