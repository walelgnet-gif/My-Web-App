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
  // See if it is counted and add 1
  locationCounts[loc] = (locationCounts[loc] || 0) + 1;
}


data.records.sort((a, b) => {
  let locA = a.fields["Location"] || "";
  let locB = b.fields["Location"] || "";
  
 
  if (locationCounts[locB] !== locationCounts[locA]) {
    return locationCounts[locB] - locationCounts[locA];
  }
 // If both are equal arange them in alphabetical order
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
              <div class="mt-auto d-flex gap-2">
              <h4 class="card-title fw-bold mb-3 w-50">${name}</h4>
              <h4 class="card-title mb-3 w-50 text-end">${review}</h4>
              </div>
              <div class="mt-auto d-flex gap-2">
                <button onclick="openModal(${i})" class="btn btn-dark w-50">Details</button>
                <a href="${yelpLink}" target="_blank" class="btn btn-danger w-50">Yelp</a>
              </div>
            </div>
            <br><br>
            <div>
               
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
  document.getElementById("deliveryOption").innerText = record["Delivery option"] || "No delivery";
  document.getElementById("specialFood").innerText = record["Special dishes"] || "";
  document.getElementById("recipeFood").innerText = record["Special dishes recipe"] || "";
  document.getElementById("specialPrice").innerText = record["Special dishes price"] || "";
  
  let image = record["Image"];
  document.getElementById("modalImage").src = image ? image[0].url : "";

  let myModal = new bootstrap.Modal(document.getElementById('detailsModal'));
  myModal.show();
} !
function handleFilterChange() {
    let selectedLocation = document.getElementById("locationFilter").value;
    let getResultElement = document.getElementById("restaurants");
    
    getResultElement.innerHTML = "";
    let filteredHtml = "";
    let previousLocation = ""; 

    window.restaurantData.forEach((record, i) => {
        let fields = record.fields;
        let restaurantLocation = fields["Location"] || "";

        if (selectedLocation === "All" || restaurantLocation === selectedLocation) {
            
            if (restaurantLocation !== previousLocation) {
                filteredHtml += `<div class="col-12 mt-4"><h1 class="text-center mb-3 fw-bold">${restaurantLocation}</h1></div>`;
                previousLocation = restaurantLocation;
            }

            let name = fields["Name"] || "No Name";
            let review = fields["Review"] || "N/A";
            let yelpLink = fields["Yelp"] || "#";
            let imageArr = fields["Image"];
            let imageUrl = (imageArr && imageArr.length > 0) ? imageArr[0].url : "";

            filteredHtml += `
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        ${imageUrl ? `<img src="${imageUrl}" class="card-img-top" style="height: 220px; object-fit: cover;" alt="${name}">` : ''}
                        <div class="card-body d-flex flex-column">
                            <div class="mt-auto d-flex gap-2">
                                <h4 class="card-title fw-bold mb-3 w-50">${name}</h4>
                                <h4 class="card-title mb-3 w-50 text-end">${review}</h4>
                            </div>
                            <div class="mt-auto d-flex gap-2">
                                <button onclick="openModal(${i})" class="btn btn-dark w-50">Details</button>
                                <a href="${yelpLink}" target="_blank" class="btn btn-danger w-50">Yelp</a>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
    });

    getResultElement.innerHTML = filteredHtml;
}
function toggleDarkMode() {
    let bodyElement = document.body;
    
    
    bodyElement.classList.toggle("dark-theme");

    let btn = document.getElementById("darkModeToggle");

   
    if (bodyElement.classList.contains("dark-theme")) {
        btn.innerText = "☀️ Light Mode";
        btn.className = "btn btn-outline-light";
    } else {
        btn.innerText = "🌙 Dark Mode";
        btn.className = "btn btn-outline-dark";
    }
} 