
function DateCalculator(config) {

  this.config = config;

  return {
    buildDayArray: buildDayArray
  };

  /**Builds the array of days, sets the basic info used to calculate the body data.**/
  function buildDayArray(days) {
    var daysToGoal = _getDaysToGoal(config.startDate, config.goalDate);
    var date = moment(new Date(config.startDate));
    var dayNumber = 0;


    console.log("CONFIG IN BUILD DAY ARRAY");
    console.log(config);
    for (var i = 0; i <= daysToGoal; i++) {

      var currentDay = new Day();

      //set our known values for the array
      currentDay.date = _addDay(date);
      currentDay.dayNumber = dayNumber;
      currentDay.dailyCalories = config.dailyCalories;
      currentDay.activityLevel = config.activityLevel;
      currentDay.height = config.height;
      currentDay.gender = config.gender;
      currentDay.age = config.age;

      //check for cheat days, modify the day we built if they exist
      currentDay = _checkCheatDay(currentDay, config.cheatDays);

      days.push(currentDay);

      dayNumber++;
      date = currentDay.date;
    }

    return days;
  }

  function _getDaysToGoal(startDate, goalDate) {
    var start = moment(new Date(startDate));
    var goal = moment(new Date(goalDate));

    var days = goal.diff(start, 'days');

    return days;
  }

  function _addDay(date) {

    var oldDate = moment(new Date(date));

    return moment(new Date(oldDate)).add(1, 'days').format('L');
  }

  function _addCheatDays(days, cheatDays) {

    for (var i = 0; i < days.length; i++) {
      _checkCheatDay(days[i], cheatDays)
    }

    return days;
  }

  function _checkCheatDay(day, cheatDays) {

    for (var i = 0; i < cheatDays.length; i++) {
      if (cheatDays[i].date === day.date) {

        day.isCheatDay = true;
        day.dailyCalories = cheatDays[i].dailyCalories;
        day.activityLevel = cheatDays[i].activityLevel;

        return day;
      }
    }
    day.isCheatDay = false;
    return day;
  }
}


