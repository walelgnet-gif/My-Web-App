"use strict";

const URL = "https://api.airtable.com/v0/appwkF00IfJIIXDXJ/HABESHA-FOOD";

const PAT = "patYeGOafWRtc502S.a00a3044a65c07de8b2b92093946c8a3933e6ca17678d5923372a60a28aa4e01";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("restaurants");

  const options = {
    method: "GET",
    headers: {
      // Bearer = I got the key
      Authorization: `Bearer ${PAT}`,
    },
  };

  await fetch(
    `${URL}`,
    options,
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        // Write some property fields like name
        let name = data.records[i].fields["Name"]; // here we are getting column values
        let location = data.records[i].fields["Location"];
        let image = data.records[i].fields["Image"];
         //here we are using the Field ID to fecth the name property
        let review = data.records[i].fields["Review"];

        newHtml += `
        <div class="col-4">
        <h1>${location}</h1>
        <h2>${name}</h2>
        ${
          image
          // ?(if)
            ? `<img class="card-img-top rounded" alt="${name}" src="${image[0].url}">`
            // :(else)
            : ``
        }
        <button type="button" class="btn btn-primary">Yelp</button>
        </div>
        `;
        
        
      }
      
      getResultElement.innerHTML = newHtml;
    });
}


// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  getAllRecords(); // no id given, fetch summaries
}