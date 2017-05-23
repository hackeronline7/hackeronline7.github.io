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

    var db = firebase.database();
    
    var editor = ace.edit('editor');
    var dbCode = db.ref().child('code');
    //var dbQueue = db.ref().child('queue');
    var dbQueue = db.ref().child('queue');
    
    var applyingChanges = false;
    
    var lastTimestamp = "";
    
   // var initialRead = true;
    
    /*dbCode.once('value', function(ref){
        editor.setValue(ref.val(),-1);
        initialRead=false;
    });*/
        
    editor.on('change', function(e){
        
        if(!localStorage.getItem('uid')){
            UID = prompt('Please Enter Your Name.');
            localStorage.setItem('uid', UID);
        }
    
        if(applyingChanges){
            return;
        }
            
        dbCode.set(editor.getValue());
        
        lastTimestamp = Date.now().toString();
        
        dbQueue.child(Date.now().toString()).set({
            event: e,
            by: localStorage.getItem('uid')
        });
        
        if(!editor.getValue()){
            //console.log("empty");
            dbQueue.remove();
        }
        
        //console.log(dbQueue.getChildrenCount());
    });

    dbQueue.on('child_added', function(ref){   
        //console.log(ref.val());
        
        if(lastTimestamp > ref.key )
            return;
        
        var value = ref.val();
        
        if(value.by === localStorage.getItem('uid')){
            return;
        }
        
        applyingChanges = true;
        editor.getSession().getDocument().applyDeltas([value.event]);
        //console.log(value.event);
        applyingChanges = false;
    });
    


    
}());