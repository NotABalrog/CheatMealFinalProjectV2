/**
 * Created by b on 2/16/2015.
 */
/**TODO: implement in v.02**/

function UnitConverter(){

  return {
    imperialInput: imperialInput,
    imperialOutput: imperialOutput
  };

  function imperialInput(config){
    config.height = config.height * 2.54 / 100; // convert to meters
    config.weight = config.weight * .453592; //convert to kg

    config.caloriesPerKgFat =  config.caloriesPerKgFat / 2.20462;
    config.caloriesPerKgMuscle =  config.caloriesPerKgMuscle / 2.20462;
    config.caloriesAvailablePerKilogramFatPerDay = config.caloriesAvailablePerKilogramFatPerDay / 2.20462;
  }


 /**copies and converts the necessary fields from metric to imperial **/
  function imperialOutput(result){
    var imperialResult = [];

    for(var i = 0; i < result.length; i++){
      var currentDay = new Day();

      currentDay.date = result[i].date;
      currentDay.dayNumber = result[i].dayNumber;
      currentDay.isCheatDay = result[i].isCheatDay;
      currentDay.bodyFat = result[i].bodyFat;
      currentDay.dailyCaloriesAvailableFromFat = result[i].dailyCaloriesAvailableFromFat;
      currentDay.age = result[i].age;
      currentDay.gender = result[i].gender;
      currentDay.bmi = result[i].bmi;
      currentDay.bmr = result[i].bmr;
      currentDay.dailyCalories = result[i].dailyCalories;
      currentDay.dailyCaloricDeficit = result[i].dailyCaloricDeficit;
      currentDay.activityLevel = result[i].activityLevel;
      currentDay.tdee = result[i].tdee;

      //conversions
      console.log(result[i].height);
      currentDay.height = result[i].height * .393701 * 100; //convert cm to inches
      currentDay.weight = result[i].weight * 2.20462; //lb to kg
      currentDay.bodyFatMass = result[i].bodyFatMass * 2.20462;
      currentDay.leanBodyMass = result[i].leanBodyMass * 2.20462;
      currentDay.expectedBodyFatMassChange = result[i].expectedBodyFatMassChange * 2.20462;
      currentDay.expectedLeanBodyMassChange = result[i].expectedLeanBodyMassChange * 2.20462;
      currentDay.expectedWeightChange = result[i].expectedWeightChange * 2.20462;

      imperialResult.push(currentDay);
   }
    console.log(imperialResult);
    return imperialResult;
  }
}
