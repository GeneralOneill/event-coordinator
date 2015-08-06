var number_of_people;
function getData(){
  // console.log($('#number_of_people').val());
  number_of_people = $('#number_of_people').val();
  display_options();
}

function display_options(){
  $('#interest').empty();
  if (number_of_people < 2) {
    // console.log('<2');
    $('#interest').append("<option value='amusement_park'>Amusement Park</option>");
    $('#interest').append("<option value='bar'>Bar</option>");
    $('#interest').append("<option value='food'>Food</option>");
    $('#interest').append("<option value='bowling_alley'>Bowling Alley</option>");
    $('#interest').append("<option value='campground'>Campground</option>");
  }
  else if (number_of_people < 4) {
    console.log('<4');
    $('#interest').append("<option value='casino'>Casino</option>");
    $('#interest').append("<option value='cemetery'>Cemetery</option>");
    $('#interest').append("<option value='gym'>Gym</option>");
    $('#interest').append("<option value='liquor_store'>Liquor Store</option>");
    $('#interest').append("<option value='movie_theater'>Movie Theater</option>");
  }
  else if (number_of_people < 6) {
    console.log('<6');
    $('#interest').append("<option value='museum'>Museum</option>");
    $('#interest').append("<option value='night_club'>Night Club</option>");
    $('#interest').append("<option value='park'>Park</option>");
    $('#interest').append("<option value='restaurant'>Restaurant</option>");
    $('#interest').append("<option value='shopping_mall'>Shopping mall</option>");
  }
  else {
    console.log('6+');
    $('#interest').append("<option value='spa'>Spa</option>");
    $('#interest').append("<option value='staduim'>Stadium</option>");
    $('#interest').append("<option value='store'>Store</option>");
    $('#interest').append("<option value='zoo'>The Zoo</option>");
    $('#interest').append("");
  }
}
