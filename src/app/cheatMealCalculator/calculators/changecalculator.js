
/**
 * //These calculations fill out the day data, after the BMR has been set by one of the formula
 */

function ChangeCalculator(config, bmrCalculator) {

  this.config = config;

  return {
    predictChanges: predictChanges
  };

  function predictChanges(days){

    //build the first day, which will then be used to project all other days;
    days[0] = _buildFirstDay(days[0]);

    //build each day based upon the day before
    for(var i = 0; i < days.length-1; i++){
      days[i+1] = _buildNextDay(days[i], days[i+1]);
    }
    return days;
  }

  /**takes a day and projects the next day**/
  function _buildNextDay(yesterday, today){

    today.weight = yesterday.weight - yesterday.expectedWeightChange;
    today.bodyFatMass = yesterday.bodyFatMass - yesterday.expectedBodyFatMassChange;
    today.leanBodyMass = yesterday.leanBodyMass - yesterday.expectedLeanBodyMassChange;
    today.bodyFat = _getBodyFat(today.weight, today.bodyFatMass);

    today = _buildToday(today);

    return today;
  }

  function _buildFirstDay(today){

    console.log("today");
    console.log(today);
    /**body data comes from config**/
    today.height = config.height;
    today.weight = config.weight;
    today.gender = config.gender;
    today.age = config.age;
    today.bodyFat = config.bodyFat;
    today.bodyFatMass = _getBodyFatMass(today.weight, today.bodyFat);
    today.leanBodyMass = _getLeanBodyMass(today.weight, today.bodyFat);

    today = _buildToday(today);

    return today;
  }

  function _buildToday(today){
    /**this data is calculated**/


    today.bmi = _getBodyMassIndex(today.height, today.weight);
    today.bmr = bmrCalculator.getBMR(today);
    today.bmr = bmrCalculator.getBMR(today);

    /**this data is used to attempt to calculate lean mass vs body fat lost**/
    today.dailyCaloriesAvailableFromFat = _getCaloriesAvailableFromFat(today.bodyFatMass);

    /**day data used in the calculation of the body data: **/
    today.tdee = _getTotalDailyEnergyExpenditure(today.bmr, today.activityLevel);
    today.dailyCaloricDeficit = _getDailyCaloricDeficit(today.dailyCalories, today.tdee);

    /**expected changes, used in the calculation of tommorrow's data**/
    today.expectedWeightChange = _getDailyWeightChange(today.dailyCaloricDeficit);
    today.expectedBodyFatMassChange = _expectedBodyFatMassChange(today.dailyCaloricDeficit,
      today.dailyCaloriesAvailableFromFat);
    today.expectedLeanBodyMassChange = _expectedLeanMassChange(today.dailyCaloricDeficit,
      today.dailyCaloriesAvailableFromFat);

    return today;
  }

  /**body data**/

  function _getLeanBodyMass(weight, bodyFat) {
    var fatMass = weight * bodyFat;

    return weight - fatMass;
  }

  function _getBodyFatMass(weight, bodyFat) {

    return weight * bodyFat;
  }

  function _getBodyFat(weight, bodyFatMass){

    return bodyFatMass / weight;
  }

  function _getBodyMassIndex(height, weight) {

    return  weight / (height * height);
  }


  function _getDailyWeightChange(dailyCaloricDeficit){

    return dailyCaloricDeficit / config.caloriesPerKgFat;
  }

  function _getBodyFatMassChange(weight, weightChange, bodyFatMass, ratioFatMassLost){

    var fatLost = weightChange * ratioFatMassLost;
    var newBodyFatMass = bodyFatMass - fatLost;

    return newBodyFatMass / weight;
  }

  function _getTotalDailyEnergyExpenditure(bmr, activityLevel) {

    return bmr * activityLevel;
  }

  function _getDailyCaloricDeficit(dailyCalories, tdee) {

    return  tdee - dailyCalories;
  }

  function _getCaloriesAvailableFromFat(bodyFatMass){

    return bodyFatMass * config.caloriesAvailablePerKilogramFatPerDay;
  }

  function _expectedBodyFatMassChange(dailyCaloricDeficit, dailyCaloriesAvailableFromFat) {
    var fatMassLost;

    if (dailyCaloricDeficit < dailyCaloriesAvailableFromFat) {
      fatMassLost = dailyCaloricDeficit / config.caloriesPerKgFat;
    }

    else{
      fatMassLost = dailyCaloriesAvailableFromFat / config.caloriesPerKgFat;
    }
    return fatMassLost;
  }

  function _expectedLeanMassChange(dailyCaloricDeficit, dailyCaloriesAvailableFromFat) {
    var leanMassLost = 0;

    if (dailyCaloricDeficit > dailyCaloriesAvailableFromFat) {
      leanMassLost = (dailyCaloricDeficit - dailyCaloriesAvailableFromFat) / config.caloriesPerKgMuscle;
    }
    return leanMassLost;
  }
}

