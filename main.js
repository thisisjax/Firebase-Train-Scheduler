// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYY_96-30cySO3PvzwNnHNdbGQZxhrj9s",
    authDomain: "train-scheduler-1b311.firebaseapp.com",
    databaseURL: "https://train-scheduler-1b311.firebaseio.com",
    projectId: "train-scheduler-1b311",
    storageBucket: "train-scheduler-1b311.appspot.com",
    messagingSenderId: "609683161322"
};
firebase.initializeApp(config);

var trainData = firebase.database();

//Document ready
$(document).ready(function () {
    console.log("ready!");

 

    //On click...
    $("#submit").on("click", function (event) {
        event.preventDefault();




        //Train Name input
        var trainName = $("#trainName").val().trim();
        //Destination input
        var destination = $("#destination").val().trim();
        //First Train Time input
        var firstTrainTime = $("#firstTrainTime").val().trim();
        //Frequency input
        var frequency = $("#frequency").val().trim();


        var addTrain = {
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        }
        //push info
        trainData.ref().push(addTrain);

      


    });

    trainData.ref().on("child_added", function (childSnapshot) {

        //Train Name input
        var trainName = childSnapshot.val().trainName;
        //Destination input
        var destination = childSnapshot.val().destination;
        //First Train Time input
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        //Frequency input
        var frequency = childSnapshot.val().frequency;
        console.log(trainName);


        var firstTime = "03:30";
        var currentTime = moment();
        console.log(currentTime);
        // //First Time pushed back 1 year
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // //Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // //Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // //Remainder
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // //Minutes Away
        var minutesAway = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + minutesAway);

        // //Next Train
        var nextArrival = moment().add(minutesAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

        // // //Make a variable for the New real time train information coming in
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(destination),
            $("<td>").text(firstTrainTime),
            $("<td>").text(frequency),

            $("<td>").text(minutesAway),

         );

            $("#table > tbody").prepend(newRow);
            //clear table
            $("#trainName").val("");
            $("#destination").val("");
            $("#firstTrainTime").val("");
            $("#frequency").val("");

      


    })

   
  
















})
