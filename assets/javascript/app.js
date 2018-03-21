var config = {
    apiKey: "AIzaSyBGcj4SS4suz1lV1RzcxZOupEJVZsV19T4",
    authDomain: "train-scheduler-19ce7.firebaseapp.com",
    databaseURL: "https://train-scheduler-19ce7.firebaseio.com",
    projectId: "train-scheduler-19ce7",
    storageBucket: "",
    messagingSenderId: "497341275121"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

  $('#addtrain').on('click', function(){

    var trainName = $('usertrainname').val().trim();
    var destination = $('userdestination').val().trim();
    var firstTrain = $('userfirst').val().trim();
    var frequency = $('userfrequency').val().trim();



    var userNewTrain = {
      trainname: trainName,
      destination: destination,
      firsttrain: firstTrain,
      frequency: frequency,
}

database.ref().push(userNewTrain)

    $('#usertrainname').val('');
    $('#userdestination').val('');
    $('#userfirst').val('');
    $('#userfrequency').val('');

    return false;

  });

database.ref().on('child_added', function(childSnapshot){
    console.log(childSnapshot.val());

var snapValue = childSnapshot.val();

var trainName = snapValue.trainname;
var destination = snapValue.destination;
var firstTrain = snapValue.firsttrain;
var frequency = snapValue.frequency;



var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);


var presentTime = moment();
    console.log("Present Time: " + moment(presentTime).format("HH:mm"))


var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in Time: " + timeDifference);


var timeLeft = timeDifference % frequency;
    console.log(timeLeft);


var tMinutesTillTrain = frequency - timeLeft;
    console.log("Minutes Until Train: " + tMinutesTillTrain);


var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("Arrival Time: " + nextTrain);

    $("#trains").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

  });
