// Get the walker image:
var walker = document.getElementById('walker');

// Configure motion params:
var walkingLeft = true;
var leftBorder = 0;
var rightBorder = window.innerWidth - walker.offsetWidth;
var speed = 10;
var xPos = rightBorder;


// The update function is called once every "frame" (via setInterval)
// Changing the walker's position each frame, will cause him to move across the screen
function update() {

    // Move "speed" pixels per iteration:
    if (walkingLeft) {
        xPos -= speed;
    } else {
        xPos += speed;
    }
    // reposition the walker
    walker.style.left = xPos + "px";

    // Turn around when you've crossed a border:
    if (xPos < leftBorder || xPos > rightBorder) {
        // css controls visual, we just ensure the correct class is assigned to walker
        walker.classList.toggle("flip");
        walkingLeft = !walkingLeft;
    }

};

// Establish an update interval (framerate)
// This will call the "update" method every 100ms
// Add code to "update" to change the walker's position
setInterval(update, 100);


// Setup a click handler that manually toggles walker direction:
walker.addEventListener('click', function() {
    var x = 0;
    var y = 10;
    var num = Math.floor(Math.random() * ((y - x) + 1) + x);
    console.log(num);
    walker.classList.toggle("flip");
    walkingLeft = !walkingLeft;
    $.ajax({
        url: "http://api.giphy.com/v1/gifs/search?q=anime&api_key=dc6zaTOxFJmzC",
        type: "GET",
        dataType: "json"
    }).done(function(response) {
        console.log(response);
        if ($("div").hasClass("api-data")) {
            $("div").remove();
        } else {
            $("body").css("background-image", "url(' " +
                response.data[num].images.downsized.url + "')")
        }
    }).fail(function(response) {
        console.log("failure");
    })
});

// Change right border when resized
window.addEventListener("resize", function() {
    rightBorder = window.innerWidth - walker.offsetWidth;
});
