/**
 * Created by b on 2/14/2015.
 */

function Plan(config, changeCalculator, dateCalculator, graphPlotter, unitConverter) {

  //the config is the user configurable starting data, containing the plan name, constants, body metrics etc.
  this.config = config;

  //days is a collection of all of our day objects in this plan, including body data
  this.imperial = [];
  this.metric = [];

  //graph data is pre-built for display on our graph
  this.imperialGraph = [];
  this.metricGraph = [];

  //uses the passed in calculator to build the days array
  this.buildMetricPlan = function () {

    //step 1 - build days array with the proper amount of days in this plan, includes the cheat days calorie information
    //and activity levels
    this.metric = dateCalculator.buildDayArray(this.metric);


    //step 2 - calculate projections of body change, based upon the passed in constants and desired
    //bmrCalculator
    this.metric = changeCalculator.predictChanges(this.metric);

    return this;
  };

  this.buildMetricGraph = function () {
    this.metricGraph = graphPlotter.plotGraphs(this.metric);

    return this;
  };

  this.convertMetricPlanToImperial = function () {
    this.imperial = unitConverter.imperialOutput(this.metric);

    return this;
  };

  this.buildImperialGraph = function () {
    this.imperialGraph = graphPlotter.plotGraphs(this.imperial);

    return this;
  };


  return this;
}
