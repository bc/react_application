import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  Button,
  Alert
} from 'react-native';
import PropTypes from 'prop-types'; // ES6

function range(len) {
  return Array.apply(null, {length: len}).map(Number.call, Number)
}

dayMilliseconds = (num) => 86400000 * num

//@return array of infusion dates in unixtime format
function infusionDates(startDateUnixTime, numInfusions, cycleLength) {
  return range(numInfusions).map((dayIndex) => startDateUnixTime + cycleLength*dayMilliseconds(dayIndex))
}

//@param array of infusion dates in unixtime format
function nextInfusion(infusionDates) {
  // remove dates in past, then return first of remaining list
  return infusionDates.filter((infusionDate) => infusionDate > Date.now())[0]
}

rmFutureDates = (infusionDates) => infusionDates.filter((infusionDate) => infusionDate < Date.now())

//@return Date object for next infusion datetime
function nextInfusionDate(startDateUnixTime, num, cycleLength){
  return new Date(nextInfusion(infusionDates(startDateUnixTime, num, cycleLength)))
}

const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]

weekdayString = (dateObject) => weekdayNames[dateObject.getDay()]
monthString = (dateObject) => monthNames[dateObject.getMonth()]
dateStringPhrase = (dateObject) => weekdayString(dateObject) + ", " + monthString(dateObject) + " " + dateObject.getDate()

numberOfCompletedInfusions = (start,num,cycleLength) => {
  return rmFutureDates(infusionDates(start,num,cycleLength)).length
}

unixTimeToStringDate = (unixTime) => {
  dateObject = new Date(unixTime)
  return dateObject.toLocaleDateString()
}



export default class Overview extends Component {
  render() {
    completedInfusions = numberOfCompletedInfusions(
                            this.props.state.regimen_date,
                            this.props.state.regimen_infusionNum,
                            this.props.state.regimen_infusionCycle
                          )
    totalWidth = 250
    progressNumerator = completedInfusions
    progressDenominator = this.props.state.regimen_infusionNum
    upcomingInfusionDate = nextInfusionDate(
                              this.props.state.regimen_date,
                              this.props.state.regimen_infusionNum,
                              this.props.state.regimen_infusionCycle
                            )
    progressWidth = totalWidth * (progressNumerator / progressDenominator)
    nextInfusionDateFormatted = upcomingInfusionDate
    console.log(upcomingInfusionDate)
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>

        <View>
          <View style={{margin:10, padding:20, backgroundColor:'white'}}>
          <Text style={{fontSize:25, fontFamily:'Avenir'}}>First Infusion date is <Text style={{fontWeight: "bold"}}> {upcomingInfusionDate.toLocaleDateString()}</Text></Text>
        </View>



          <View style={{margin:10, padding:20, backgroundColor:'white'}}>
            <Text style={{fontSize:25, fontFamily:'Avenir'}}>Progress</Text>
            <View style={{
              flexDirection: 'row',
              marginBottom:10,
              marginTop:15
            }}>
              <View style={{
                width: progressWidth,
                height: 12,
                backgroundColor: 'green'
              }}></View>
              <View style={{
                width: totalWidth,
                paddingTop:10,
                height: 12,
                backgroundColor: 'lightgrey'
              }}>

              </View>
            </View>
            <Text style={{fontSize:12, fontFamily:'Avenir'}}>Completed {progressNumerator}/{progressDenominator} infusions.</Text>
            <Text style={{fontSize:12, fontFamily:'Avenir'}}>Regimen from {unixTimeToStringDate(this.props.state.regimen_date)} until </Text>
        </View>

        <View style={{margin:10, padding:20, backgroundColor:'white'}}>
          <Text style={{fontSize:25, fontFamily:'Avenir'}}>Today's Forecast</Text>
          <Text style={{fontSize:12, fontFamily:'Avenir'}}>Anxiety: <Text style={{fontWeight: "bold"}}>2</Text></Text>
          <Text style={{fontSize:12, fontFamily:'Avenir'}}>Fatigue: <Text style={{fontWeight: "bold"}}>3</Text></Text>
          <Text style={{fontSize:12, fontFamily:'Avenir'}}>Lack of Appetite: <Text style={{fontWeight: "bold"}}>0</Text></Text>
        </View>



        </View>

        <View style={{
          backgroundColor: '#FFFFFF'
        }}>
          <Button onPress= {() => {
            this.props.navigation.navigate('SideEffect')}
          } title="Log Symptoms"/>
        </View>
      </View>
    )
  };
}
