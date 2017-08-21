$(document).ready(function() {
// Initial array of animals
var animals = ["alligator", "racoon", "pig", "tiger",
                  "giraffe" , "lizard","goat", "horse", "cow", "fox", "kangaroo",
                  "panda", "deer", "elephant" ];
// renderButtons will display the animal buttons for all animals within the
// animalsArr array.
function renderButtons() {
  // Empty the buttons panel before redrawing it
  $("#button").empty();
  // Loop through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Dynamicaly generate a button for each animal in the array
    var button = $("<button>");
    button.addClass("animalButton");
    button.attr("data-animal", animals[i]);
    button.text(animals[i]);
    // Add the button to the HTML
    $("#button").append(button);
  }
}
// An event handler for the user form to add additional animals to the array
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  // Get the input from the textbox
  var animal = $("#input-animal").val().trim();
  // The animal from the textbox is then added to our animals array
  animals.push(animal);
  $("#input-animal").val("");
  // Redraw the animal buttons
  renderButtons();
});

// displayAnimal will display animal  with the Giphy API
function displayAnimal() {
  // Get the animal name from the button clicked
  var animalName = $(this).attr("data-animal");
  var animalStr = animalName.split(" ").join("+");
  // Construct the Giphy URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalStr + 
                 "&rating=pg-13&limit=20&api_key=dc6zaTOxFJmzC";
  // Make the AJAX call to the Giphy API
  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( response ) {
    var data = response.data;

    // Create and display div elements for each of the returned Gifs
    $("#animal-view").empty();
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("animal-view-new");

      var newRating = $("<h2>").html("Rating: " + data[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", data[i].images.fixed_height_still.url);
      newImg.attr("data-still", data[i].images.fixed_height_still.url);
      newImg.attr("data-animate", data[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      // Append the new Gifs to the animal-view
      $("#animal-view").append(newDiv);
    }
  });
}

// animateAnimal will animate a still Gif and stop a moving Gif
function animateAnimal() {
  // The image state will be either "still" or "animated"
  var state = $(this).find("img").attr("data-state");

  // Make the Gif either animated or still depending on the "data-state" value
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

// Render the initial animal buttons when the HTML has finished loading
renderButtons();

// An event handler for the animal buttons to fetch appropriate Gifs
$(document).on("click", ".animalButton", displayAnimal);

// Add an event handler for the animal Gifs to make the image animate and stop
$(document).on("click", ".animal-view-new", animateAnimal);

});