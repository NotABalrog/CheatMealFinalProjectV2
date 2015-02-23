/**
 * Created by b on 2/15/2015.
 */
//Mifflin-St Jeor: Developed in the 1990s and more realistic in todays settings. Still doesn't consider the differences as a consequence of high BF%. Thus it again OVERESTIMATES NEEDS, ESPECIALLY IN THE OVERWEIGHT.
//MEN: BMR = [9.99 x weight (kg)] + [6.25 x height (cm)] - [4.92 x age (years)] + 5
//WOMEN: BMR = [9.99 x weight (kg)] + [6.25 x height (cm)] - [4.92 x age (years)] -161


function MifflinStJeor(){


  this.getBMR = function(day) {

    var bmr = 0;

    if(day.gender === "male"){
     bmr = (9.99 * day.weight) + (6.25 * (day.height * 100)) - (4.92 * day.age) + 5
    }

    if(day.gender === "female"){
      bmr = (9.99 * day.weight) + (6.25 * (day.height * 100)) - (4.92 * day.age) - 161
    }

    return bmr;
  };

  return this;

}
