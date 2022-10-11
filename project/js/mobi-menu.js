/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
let offCanvas = Array.prototype.slice.call(document.getElementsByClassName("js-off-canvas"))[0];
function openNav() {
  offCanvas.style.width = "250px";

}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  offCanvas.style.width = "0";

}

var acc = document.getElementsByClassName("js-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}