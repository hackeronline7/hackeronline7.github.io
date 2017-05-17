var editor = ace.edit('editor');
var checkPoint = setInterval(function(){
    var codeText = editor.getValue();
    //console.log(codeText);
    firebase.database().ref('code').set(codeText);
}, 1); 

