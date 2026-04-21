"use strict";

const URL = "https://api.airtable.com/v0/appwkF00IfJIIXDXJ/HABESHA-FOOD";

const PAT = "patYeGOafWRtc502S.a00a3044a65c07de8b2b92093946c8a3933e6ca17678d5923372a60a28aa4e01";


async function getAllRecords() {
  let getResultElement = document.getElementById("restaurants");

  const options = {
    method: "GET",
    headers: {
     
      Authorization: `Bearer ${PAT}`,
    },
  };

  await fetch(
    `${URL}`,
    options,
  )
    .then((response) => response.json())
    .then((data) => {
      window.restaurantData = data.records; 
      console.log(data); 

      getResultElement.innerHTML = ""; 

      
let locationCounts = {};
for (let i = 0; i < data.records.length; i++) {
  let loc = data.records[i].fields["Location"] || "";
  locationCounts[loc] = (locationCounts[loc] || 0) + 1;
}


data.records.sort((a, b) => {
  let locA = a.fields["Location"] || "";
  let locB = b.fields["Location"] || "";
  
 
  if (locationCounts[locB] !== locationCounts[locA]) {
    return locationCounts[locB] - locationCounts[locA];
  }
 
  return locA.localeCompare(locB); 
});

      let newHtml = "";
      let previousLocation = "";

      for (let i = 0; i < data.records.length; i++) {
        
        let name = data.records[i].fields["Name"]; 
        let location = data.records[i].fields["Location"];
        let image = data.records[i].fields["Image"];
         
        let review = data.records[i].fields["Review"];
        let yelpLink = data.records[i].fields["Yelp"];

       if (location !== previousLocation) {
          newHtml += `<div class="col-12 mt-4"><h1 class="text-center mb-3 fw-bold">${location}</h1></div>`;
          previousLocation = location; 
        }

      
        newHtml += `
        <div class="col-12 col-md-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm border-0">
            ${
              image
              //if
                ? `<img class="card-img-top" alt="${name}" src="${image[0].url}" style="height: 220px; object-fit: cover;">`
              //else return empty
                : ``
            }
            <div class="card-body d-flex flex-column">
              <h4 class="card-title fw-bold mb-3">${name}</h4>
              
              <div class="mt-auto d-flex gap-2">
                <button onclick="openModal(${i})" class="btn btn-dark w-50">Details</button>
                <a href="${yelpLink}" target="_blank" class="btn btn-danger w-50">Yelp</a>
              </div>
            </div>
          </div>
        </div>
        `;
        
        
      }
      
      getResultElement.innerHTML = newHtml;
    });
}


let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords(); 
}


function openModal(index) {
 
  let record = window.restaurantData[index].fields;
  
  
  document.getElementById("modalTitle").innerText = record["Name"] || "Details";
  document.getElementById("modalDescription").innerText = record["Description"] || "No description available.";
  document.getElementById("modalPrice").innerText = record["Price"] || "Not listed";
  document.getElementById("modalHours").innerText = record["Availability / Hours"] || "Not listed";
  
  let image = record["Image"];
  document.getElementById("modalImage").src = image ? image[0].url : "";

  // Show the popup using Bootstrap's built-in tool!
  let myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
  myModal.show();
}