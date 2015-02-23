/**
 * Created by b on 2/15/2015.
 */


//Katch-McArdle:Considered the most accurate formula for those who are relatively lean.
// Use ONLY if you have a good estimate of your bodyfat %.
//BMR = 370 + (21.6 x LBM)Where LBM = [total weight (kg) x (100 - bodyfat %)]/100

function KatchMcArdle() {

  this.getBMR = function(day) {

    var bmr = 370 + (21.6 * day.leanBodyMass);

    return bmr;
  };

  return this;
}
