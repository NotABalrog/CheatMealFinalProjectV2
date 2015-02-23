/**
 * Created by b on 2/14/2015.
 */
function Day(){

  /**Day meta data**/
  this.date = null;
  this.dayNumber = null;
  this.isCheatDay = null;

  /**body data comes from config**/
  this.height = null;
  this.weight = null;
  this.gender = null;
  this.age = null;
  this.bodyFat = null;

  /**this data is calculated**/
  this.bmi = null;
  this.bmr = null;
  this.bodyFatMass = null;
  this.leanBodyMass = null;

  /**this data is used to attempt to calculate lean mass vs body fat lost**/
  this.dailyCaloriesAvailableFromFat = null;

  /**day data used in the calculation of the body data **/
  this.dailyCalories = null;
  this.activityLevel = null;
  this.tdee = null;
  this.dailyCaloricDeficit = null;
  this.expectedWeightChange = null;
  this.expectedBodyFatMassChange = null;
  this.expectedLeanBodyMassChange = null;

  return this;
}
