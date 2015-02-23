'use strict';

angular.module('cheatMealFinalProjectV2')
  .controller('MainCtrl', function ($scope, Simulator, $log) {
    /**UI builds a config file, which is used to build projects, each config file corresponds to a plan,
     * all plans can be displayed in the ui, or removed **/

    /**Plan builder start**/
    var lastDayModified = {};
    $scope.planConfigs = [];
    $scope.config = {};
    $scope.cheatDays = {};
    var currentId = 0;


    //testPlans();
    $scope.test = function () {

      $scope.config = new Config();

      $scope.config.id = currentId++;
      $scope.config.planName = "test 1";
      $scope.config.dailyCalories = 1500;
      $scope.config.activityLevel = 1.4;
      $scope.config.startDate = "01/13/2015";
      $scope.config.goalDate = "04/13/2015";

      /** this data is pulled from the user to build the first day **/
      $scope.config.height = 1.8288;
      $scope.config.weight = 104;
      $scope.config.gender = "male";
      $scope.config.bodyFat = .35;
      $scope.config.age = 29;

    };

    $scope.newPlan = function () {
      lastDayModified = {};
      $scope.config = {};
      $scope.cheatDays = {};
    };

    /**Handles the Save Plan click, builds a new config file and copies the current UI values into it**/
    $scope.savePlan = function (config) {

      console.log($scope.height);
      console.log(config);

      //Check if this is an existing plan or a new plan
      var checkPlan = _checkIfPlanExists(config.config);
      var indexOfExistingPlan = checkPlan.index;

      console.log(indexOfExistingPlan);

      //if planConfig exists,
      if (checkPlan.exists) {

        console.log("existing plan");

        $scope.planConfigs[indexOfExistingPlan].id = currentId++;
        $scope.planConfigs[indexOfExistingPlan].planName = $scope.config.planName;
        $scope.planConfigs[indexOfExistingPlan].dailyCalories = $scope.config.dailyCalories;
        $scope.planConfigs[indexOfExistingPlan].activityLevel = $scope.config.activityLevel;
        $scope.planConfigs[indexOfExistingPlan].startDate = moment(new Date($scope.config.startDate)).format('L');
        $scope.planConfigs[indexOfExistingPlan].goalDate = moment(new Date($scope.config.goalDate)).format('L');

        /** this data is pulled from the user to build the first day **/
        $scope.planConfigs[indexOfExistingPlan].height = $scope.config.height;
        $scope.planConfigs[indexOfExistingPlan].weight = $scope.config.weight;
        $scope.planConfigs[indexOfExistingPlan].gender = $scope.config.gender;
        $scope.planConfigs[indexOfExistingPlan].bodyFat = $scope.config.bodyFat;
        $scope.planConfigs[indexOfExistingPlan].age = $scope.config.age;
        $scope.planConfigs[indexOfExistingPlan].bmrCalcSelection = $scope.config.bmrCalcSelection;

        //set the to the last made plan for adding cheat meals easily;
        lastDayModified = $scope.planConfigs[indexOfExistingPlan];
      }

      else {
        _savePlan($scope.config);
      }

      //set the min max for the datePicker
      setMinMaxDates();

      //clear data from form, so a new plan can be added
      lastDayModified = {};
      $scope.config = {};
      $scope.cheatDays = {};

    };

    /** saves the plan sent to it to the planConfigs array**/
    function _savePlan(config){
      //add a new planConfig
      var newPlanConfig = new Config();

      /** plan data **/
      newPlanConfig.id = currentId++;
      newPlanConfig.planName = config.planName;
      newPlanConfig.dailyCalories = config.dailyCalories;
      newPlanConfig.activityLevel = config.activityLevel;
      newPlanConfig.startDate = moment(new Date(config.startDate)).format('L');
      newPlanConfig.goalDate = moment(new Date(config.goalDate)).format('L');

      /** this data is pulled from the user to build the first day **/
      newPlanConfig.height = config.height;
      newPlanConfig.weight = config.weight;
      newPlanConfig.gender = config.gender;
      newPlanConfig.bodyFat = config.bodyFat;
      newPlanConfig.age = config.age;
      newPlanConfig.bmrCalcSelection = config.bmrCalcSelection;

      //set the to the last made plan for adding cheat meals easily;
      lastDayModified = newPlanConfig;

      $scope.planConfigs.push(newPlanConfig);
      console.log("New plan");
    }

    /** Loops through planConfigs and checks if the ID is a duplicate, returns a response object**/
    function _checkIfPlanExists(config) {

      //
      var response = {};
      response.exists = false;
      response.index = 0;

      for (var i = 0; i < $scope.planConfigs.length; i++) {
        if ($scope.planConfigs[i].id === config.id) {

          response.exists = true;
          response.index = i;

          return response;
        }
      }
      return response;
    }


    /** Add recurring cheat day form **/
    $scope.addRecurringCheatDay = function () {

      //find the plan in the array these cheat days are for, based upon the last plan modified
      var checkPlan = _checkIfPlanExists(lastDayModified);
      var indexOfExistingPlan = checkPlan.index;

      var startDate = moment(new Date(lastDayModified.startDate));
      var goalDate = moment(new Date(lastDayModified.goalDate));
      var frequency = $scope.cheatDays.recurringCheatDayFrequency;
      var calories = $scope.cheatDays.recurringCheatDayCalories;

      var current = startDate;

      //loop through from start date to end date, adding the frequency to the date until we pass the end date;
      for (var i = false; i != true;) {

        if (current.isSame(goalDate) || current.isAfter(goalDate)) {
          console.log("conditional reached");
          i = true;
        }

        var cheatDay = new Day();
        cheatDay.date = current.add(frequency, 'days').format('L');
        cheatDay.dailyCalories = calories;
        current = moment(new Date(cheatDay.date));

        //add our cheat day
        $scope.planConfigs[indexOfExistingPlan].cheatDays.push(cheatDay);

        console.log("AFTER CHEAT DAY ADDED");
        console.log($scope.planConfigs);
      }

      //set the min max for the datePicker
      setMinMaxDates();
    };

    /**Add single cheat day**/
    $scope.addSingleCheatDay = function () {
      var checkPlan = _checkIfPlanExists(lastDayModified);
      var indexOfExistingPlan = checkPlan.index;

      if (checkPlan.exists) {
        var date = $scope.dt;
        var calories = $scope.cheatDays.singleCheatDayCalories;

        var cheatDay = new Day();
        cheatDay.date = moment(new Date(date)).format('L');
        cheatDay.dailyCalories = calories;

        $scope.planConfigs[indexOfExistingPlan].cheatDays.push(cheatDay);
        console.log($scope.planConfigs[indexOfExistingPlan].cheatDays);
      }

      else{
        console.log("Error at adding singleCheatDay: selected plan doesn't exist");
      }
    };

    /** View and Edit Plans panel start**/

    /**Edit: handles the click event on the view and edit plans panel, loads that data into ui
     * for editing.**/
    $scope.editPlan = function (config) {
      for (var i = 0; i < $scope.planConfigs.length; i++) {
        if ($scope.planConfigs[i].id === config.config.id) {
          $scope.config = $scope.planConfigs[i];
          lastDayModified = $scope.planConfigs[i];
          console.log("Edit PLAN");
          console.log($scope.config);

          //set the min max for the datePicker
          setMinMaxDates();
        }
      }
    };

    /**Clone button, allows one click cloning of a plan**/
    $scope.clonePlan = function(config){

      var checkPlan = _checkIfPlanExists(config);
      var indexOfExistingPlan = checkPlan.index;

      console.log(config);
      console.log(checkPlan);
      if(checkPlan.exists){
        var planToClone = $scope.planConfigs[indexOfExistingPlan];

        //increment Id to make it a new plan;
        planToClone.id = currentId++;

        //save the cloned plan as new plan
        _savePlan(planToClone);
        console.log("plan cloned");
      }
      else{
        console.log("clone plan error, no existing plan");
      }
    };

    /** remove plan button **/
    $scope.removePlan = function(config){
      var checkPlan = _checkIfPlanExists(config);
      var indexOfExistingPlan = checkPlan.index;

      console.log(config);
      console.log(checkPlan);
      if(checkPlan.exists){
        $scope.planConfigs.splice(indexOfExistingPlan, 1);
        console.log("plan removed")
      }
      else{
        console.log("remove plan error, no existing plan");
      }
    };


    /**run calcs**/
    var results = [];
    $scope.run = function () {
      console.log("Plan Configs");
      console.log($scope.planConfigs);
      results = Simulator.run($scope.planConfigs);
      console.log("Our results");
      console.log(results);

      //variables that hold the data to be graphed
      $scope.data = [];
      $scope.series = [];
      $scope.labels = [];

      //find out which xAxis we're going to use by finding the longest, and using it
      for(var p = 0; p < results.length; p++){
        if(results[p].metricGraph.xAxis.length > $scope.labels.length){
          $scope.labels = results[p].metricGraph.xAxis;
        }
      }

      for (var i = 0; i < results.length; i++) {
        $scope.data.push(results[i].metricGraph.yAxis.weight);
        $scope.series.push(results[i].config.planName);
      }

    };

     /**BMR formula section**/
    $scope.setBMRCalc = function(number){
      if(number === 1){
        $scope.config.bmrCalcSelection = "Mifflin St Jeor"
      }
      if(number === 2){
        $scope.config.bmrCalcSelection = "Katch McArdle"
      }
      if(number === 3){
        $scope.config.bmrCalcSelection = "Harris Benedict"
      }
    };


    /**date picker section**/
    function setMinMaxDates() {
      $scope.maxDate = lastDayModified.goalDate;
      $scope.minDate = lastDayModified.startDate;
    }

    $scope.today = function () {
      $scope.dt = new Date();

    };

    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };


    $scope.toggleMin = function () {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();

    $scope.open = function ($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  });
