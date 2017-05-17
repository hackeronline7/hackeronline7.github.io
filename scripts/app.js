(function () {
    var config = {
        apiKey: "AIzaSyAW1FyuzMDEoQzELUilKo1K21F6wCa1bg8",
        authDomain: "realtime-code.firebaseapp.com",
        databaseURL: "https://realtime-code.firebaseio.com",
        projectId: "realtime-code",
        storageBucket: "realtime-code.appspot.com",
        messagingSenderId: "978109384148"
    };

    firebase.initializeApp(config);

    var editor = ace.edit('editor');

    var dbCode = firebase.database().ref().child('code');

    dbCode.on('value', snap => {editor.setValue(snap.val(),1)});
    
}());