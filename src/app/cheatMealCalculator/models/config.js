/**
 * Created by b on 2/14/2015.
 */
/** the config file is built before every plan is submitted to the calculators to
 * plot out **/

function Config() {

  var config = {};

  /**units**/
  config.perferredUnits = "metric";

  /** plan data **/
  config.planName = null;
  config.dailyCalories = 0;
  config.activityLevel = 1.0;
  //todo: test
  config.startDate = moment().format('L');
  config.goalDate = "06/02/2015";

  /** this data is pulled from the user to build the first day **/
  config.height = null;
  config.weight = null;
  config.gender = null;
  config.bodyFat = null;
  config.age = null;
  config.bmrCalcSelection = "Mifflin St Jeor"; //defaults to most accurate

  /** constants, settable in the advanced options**/
  config.caloriesPerKgFat = 7714;
  config.caloriesPerKgMuscle = 5510;
  config.caloriesAvailablePerKilogramFatPerDay = 68.324;

  /**cheat day data, for this specific plan, contains day objects, which
   * have modified dailyCalories and activity levels **/
  config.cheatDays = [];

  return config;
}
