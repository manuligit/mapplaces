var map;
var markers = [];
var places;
let base_url = "http://localhost:8000/api";
let filter = "";
let db_places;
var search = "";
var keywords = [];
var keywordfilter = [];

//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  V I E W S                                *
//  * * * * * * * * * * * * * * * * * * * * * * * 

//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  F U N C T I O N S . j s                  *
//  * * * * * * * * * * * * * * * * * * * * * * * 

// Get form data as URLSearchParams to send with fetch request by searching an element from the DOM
function getFormData(tag) {
  var formElement = document.querySelector(tag);
  const data = new URLSearchParams();
  for (const pair of new FormData(formElement)) {
    data.append(pair[0], pair[1]);
  }
  return data;
}


//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  M A P  . j s                             *
//  * * * * * * * * * * * * * * * * * * * * * * * 



//  * * * * * * * * * * * * * * * * * * * * * * * 
//  *  R O U T E R . j s                        *
//  * * * * * * * * * * * * * * * * * * * * * * * 