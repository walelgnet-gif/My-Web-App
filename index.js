"use strict";

async function getAllRecords() {
    // 1. Grab your HTML container (make sure "restaurant-container" is in your index.html)
    let getResultElement = document.getElementById("restaurant-container");

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer patYeGOafWRtc502S.a00a3044a65c07de8b2b92093946c8a3933e6ca17678d5923372a60a28aa4e01`
        }
    };

    // 2. We use try/catch to handle any network errors cleanly
    try {
        // 3. Pure async/await syntax
        const response = await fetch('https://api.airtable.com/v0/appwkF00IfJIIXDXJ/HABESHA%20FOOD', options);
        const data = await response.json();
        
        console.log(data); // Check your browser console, you should see your 10 restaurants!
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// 4. Actually execute the function!
getAllRecords();