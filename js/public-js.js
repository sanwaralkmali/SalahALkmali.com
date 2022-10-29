let nav_menu = document.querySelector("#nav-menu");
let nav_menu_item = document.getElementById("responsive-navbar");
nav_menu.addEventListener("click", function() {
    nav_menu_item.classList.toggle("show");
}
);