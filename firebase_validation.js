/***** ..codeauthor:: Muthukumar Subramanian *****/
/*****  HTML JavaScript to Write and Read on the Google Firebase *****/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

/***** Firebase config *****/
const firebaseConfig = {
    apiKey: "AIzaSyCYYHnX70Uh_221XE-WIecQlYnLHX2Mv5Y",
    authDomain: "lm35esp8266.firebaseapp.com",
    databaseURL: "https://lm35esp8266-default-rtdb.firebaseio.com",
    projectId: "lm35esp8266",
    storageBucket: "lm35esp8266.appspot.com",
    messagingSenderId: "560801000015",
    appId: "1:560801000015:web:4dab3a01813aff73ed583a"
  };

/***** Initialize Firebase *****/
const app = initializeApp(firebaseConfig);

/***** write data to firebase *****/
function write_db() {
    console.log("DEBUG: Write function");
    var db = getDatabase();
    var create_db_table = ref(db, 'test/' );
    var user_name = document.getElementById("user_name").value;
    var user_password =  document.getElementById("user_name_password").value;
    if( user_name == '' || user_password == ''){
        alert("Make sure, must be non-empty data is required!!!");
        console.log("Make sure, must be non-empty data is required!!!");
        throw "Make sure, must be non-empty data is required!!!";
    }
    set(ref(db, 'test/' ), {
      a: user_name,
      b: user_password
    }).then((res) => {
        console.log();
    })
    .catch((err) => {
        alert(err.message);
        console.log(err.code);
        console.log(err.message);
    })
}

/***** read data from firebase *****/
function read_db() {
    var db = getDatabase();
    var connect_db = ref(db, 'test/' );
    var retrieve_data='';
    console.log("DEBUG: Read function");
    onValue(connect_db, (snapshot) => {
        retrieve_data = snapshot.val();
        //console.log("user_name: " + retrieve_data.user_name);
        //console.log("user_name_password: " + retrieve_data.user_name_password);
        call_loop_print(retrieve_data);
        document.getElementById("display_read_data").innerHTML =  "<pre>" + "temp: " + retrieve_data.a +
                '\n' + "Led: " + retrieve_data.b + "</pre>";
        })
    function call_loop_print(retrieve_data){
        for (var r=0;r<Object.entries(retrieve_data).length;r++){
            var key = Object.keys(retrieve_data)[r];
            var value = retrieve_data[key];
            console.log("Key_" + r + ': ' + key + " Value_:" + r + ': ' + value );
           }
 }
}
/***** call write data function *****/
var write_data_to_firebase = document.getElementById("write_data_to_firebase");
write_data_to_firebase.addEventListener('click', write_db);

/***** call read data function *****/
var read_data_from_firebase = document.getElementById("read_data_from_firebase");
read_data_from_firebase.addEventListener('click', read_db);