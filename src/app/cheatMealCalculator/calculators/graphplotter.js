/**
 * Created by b on 2/16/2015.
 */

function GraphPlotter() {

  return {
    plotGraphs: plotGraphs
  };

  function plotGraphs(result){

     var graphData = {};

      graphData.xAxis = _buildXAxis(result.length);
      graphData.yAxis = _buildYAxis(result);
      //graphData.config = result.config;

    return graphData;
  }

  function _buildXAxis(dayCount) {
    var xAxis = [];
    var today = 0;

    for (var i = 0; i < dayCount; i++) {

      today++;
      xAxis.push(today);
    }

    return xAxis;
  }

  function _buildYAxis(result) {

    var yAxis = {};

    yAxis.bmi = [];
    yAxis.bmr = [];
    yAxis.weight = [];
    yAxis.bodyFatMass = [];
    yAxis.leanBodyMass = [];

    yAxis.tdee = [];
    yAxis.dailyCaloricDeficit = [];
    yAxis.expectedWeightChange = [];
    yAxis.expectedLeanBodyMassChange = [];
    yAxis.expectedBodyFatMassChange = [];


    for (var i = 0; i < result.length; i++) {
      yAxis.bmi.push(result[i].bmi);
      yAxis.bmr.push(result[i].bmr);
      yAxis.weight.push(result[i].weight);
      yAxis.bodyFatMass.push(result[i].bodyFatMass);
      yAxis.leanBodyMass.push(result[i].leanBodyMass);
      yAxis.tdee.push(result[i].tdee);
      yAxis.dailyCaloricDeficit.push(result[i].dailyCaloricDeficit);
      yAxis.expectedWeightChange.push(result[i].expectedWeightChange);
      yAxis.expectedLeanBodyMassChange.push(result[i].expectedLeanBodyMassChange);
      yAxis.expectedBodyFatMassChange.push(result[i].expectedBodyFatMassChange)
    }

    console.log(yAxis);
    return yAxis;
  }
}
