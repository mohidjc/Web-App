
function orders(){
  const form3 = document.getElementById("popupForm3");
  const overlay3 = document.getElementById("overlay3");
  const closeFormButton = document.getElementById("closeForm");

  // Displaying the form, overlay
  overlay3.style.display = "block";
  form3.style.display = "block";
  

  // If close button is clicked, the form, overlay should disappear
  closeFormButton.addEventListener("click", function () {
      form3.style.display = "none";
      overlay3.style.display = "none";
  });
}
function closeThis(){
  const form3 = document.getElementById("popupForm3");
  const overlay3 = document.getElementById("overlay3");

  overlay3.style.display = "none";
  form3.style.display = "none";
}


function login(){
    const form1 = document.getElementById("popupForm1");
    const overlay1 = document.getElementById("overlay1");
    const form = document.getElementById("popupForm");
    const overlay = document.getElementById("overlay");
    const closeFormButton = document.getElementById("closeForm");

    form1.style.display = "none";
    overlay1.style.display = "none";

    // Displaying the form, overlay
    form.style.display = "block";
    overlay.style.display = "block";

    // If close button is clicked, the form, overlay should disappear
    closeFormButton.addEventListener("click", function () {
        form.style.display = "none";
        overlay.style.display = "none";
    });
}

function SignUp(){
    const form = document.getElementById("popupForm");
    const overlay = document.getElementById("overlay");
    const form1 = document.getElementById("popupForm1");
    const overlay1 = document.getElementById("overlay1");
    const closeFormButton1 = document.getElementById("closeForm1");

    form.style.display = "none";
    overlay.style.display = "none";

    // Displaying the form, overlay
    form1.style.display = "block";
    overlay1.style.display = "block";

    // If close button is clicked, the form, overlay should disappear
    closeFormButton1.addEventListener("click", function () {
        form1.style.display = "none";
        overlay1.style.display = "none";
    });
}

function SignUp2(){
  const form = document.getElementById("popupForm");
  const overlay = document.getElementById("overlay");

  form.style.display = "block";
  overlay.style.display = "block";

  closeFormButton.addEventListener("click", function () {
      form.style.display = "none";
      overlay.style.display = "none";
  });
}



function Opencart(){



  const cart = document.getElementById("cart");
  const overlay3 = document.getElementById("overlay3");
  const closeFormButton = document.getElementById("cart-close");

  cart.style.display = "block";
  overlay3.style.display = "block";
  document.body.classList.add("no-scroll");

  // If close button is clicked, the form, overlay should disappear
  closeFormButton.addEventListener("click", function () {
      cart.style.display = "none";
      overlay3.style.display = "none";
      document.body.classList.remove("no-scroll");
  });
}

document.addEventListener("click", closeDropdownOnClickOutside);

function closeDropdownOnClickOutside(event) {
  var iconButton = document.querySelector(".closeForm");
  const form3 = document.getElementById("popupForm3");
  const overlay3 = document.getElementById("overlay3");

  // Check if the clicked element is not inside the submenu or the icon button
  if (iconButton.contains(event.target)) {
      form3.style.display = 'none';
      overlay3.style.display = 'none';
  }
}

function toggleDropdown(dropdownId) {
  var dropdown = document.getElementById(dropdownId);
  if (dropdown.style.display === 'block') {
    dropdown.style.display = 'none';
  } else {
    dropdown.style.display = 'block';
  }
}

