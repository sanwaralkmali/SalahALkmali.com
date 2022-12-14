// set up text to print, each item in array is new line
var aText = new Array(
    "If you are planning for a year, sow rice;",
    "if you are planning for a decade, plant trees;",
    "if you are planning for a lifetime, educate people."
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    var destination = document.getElementById("quote");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if (iTextPos++ == iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout("typewriter()", 500);
        }
    } else {
        setTimeout("typewriter()", iSpeed);
    }
}

typewriter();

document.getElementById("math-content").addEventListener("mouseover", function() {
document.getElementById("content-map-title").innerHTML = "Mathematics Map";
});

document.getElementById("computer-sci-content").addEventListener("mouseover", function() {
    document.getElementById("content-map-title").innerHTML = "Computer Science Map";
    });