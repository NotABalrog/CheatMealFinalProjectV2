/**
 * Created by b on 2/15/2015.
 */
//1/ Harris-Benedict formula: Very inaccurate & derived from studies on LEAN, YOUNG, ACTIVE males in 1919. Notorious for OVERESTIMATING requirements, especially in the overweight. DON'T USE IT!
//MEN: BMR = 66 + [13.7 x weight (kg)] + [5 x height (cm)] - [6.76 x age (years)]
//WOMEN: BMR = 655 + [9.6 x weight (kg)] + [1.8 x height (cm)] - [4.7 x age (years)]

function HarrisBenedict() {

  this.getBMR = function (day) {
    var bmr = 0;

    if (day.gender === "male") {
      bmr = 66.5 + (13.75 * day.weight) + (5 * (day.height * 100)) - (6.76 * day.age);
    }

    if (day.gender === "female") {
      bmr = 655.1 + (9.563 * day.weight) + (1.8 * (day.height * 100)) - (4.7 * day.age);
    }
    return bmr;
  };

  return this;
}
