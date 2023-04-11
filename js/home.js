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

// typewriter();

const textDisplay = document.getElementById('quote');
const inputText = "If you are planning for a year, sow rice;<br>if you are planning for a decade, plant trees;<br> if you are planning for a lifetime, educate people.";

function typeText(text, element, index = 0) {
    if (index < text.length) {
        const currentChar = text.charAt(index);

        if (currentChar === '<' && text.slice(index, index + 4) === '<br>') {
            element.innerHTML += '<br>';
            index += 4;
        } else {
            element.innerHTML += currentChar;
            index += 1;
        }

        setTimeout(() => typeText(text, element, index), 100); // Adjust the number 100 for the typing speed (in milliseconds)
    } else {
        setTimeout(() => {element.innerHTML = '';}, 4000); // Adjust the number 1000 for the pause duration (in milliseconds) before typing again
        setTimeout(() => typeText(text, element), 4000); // Adjust the number 1000 for the pause duration (in milliseconds) before typing again
    }
}

typeText(inputText, textDisplay);


document.getElementById("math-content").addEventListener("click", function () {
    document.getElementById("content-map-title").innerHTML = "Mathematics Map";
    document.getElementById("videoIframe").src = "../../assets/roadmap/videos/5th Math Roadmap.mp4";
    document.getElementById("mathRoadmaps").style.display = "flex";
    document.getElementById("programmingRoadmaps").style.display = "none";
});

document.getElementById("computer-sci-content").addEventListener("click", function () {
    document.getElementById("content-map-title").innerHTML = "Computer Science Map";
    document.getElementById("videoIframe").src = "../../assets/roadmap/videos/6th grade Roadmap.mp4";
    document.getElementById("mathRoadmaps").style.display = "none";
    document.getElementById("programmingRoadmaps").style.display = "flex";
});
