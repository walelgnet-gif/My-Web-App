// ==========================================
// 1. CONFIGURATION
// ==========================================

const url = 'https://api.airtable.com/v0/appwkF0OIfJIIXDXJ/HABESHA%20FOOD';

// ==========================================
// 2. FETCH AND RENDER FUNCTION (Async/Await)
// ==========================================
async function loadRestaurants() {
    const container = document.getElementById('restaurant-container');

    try {
        // Await the fetch Promise
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_PAT}`
            }
        });

        // Check if the response is successful (Status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Await the JSON parsing Promise
        const data = await response.json();
        const records = data.records;

        // Clear the loading spinner
        container.innerHTML = '';

        // Loop through the Airtable data and build HTML
        records.forEach(record => {
            const fields = record.fields;
            
            // Extract the image safely (Airtable images are arrays)
            const imageUrl = (fields.Image && fields.Image.length > 0) 
                ? fields.Image[0].url 
                : 'https://via.placeholder.com/400x250?text=No+Image';

            // Build a professional Bootstrap Card for each restaurant
            const cardHTML = `
                <div class="col">
                    <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                        <img src="${imageUrl}" class="card-img-top" alt="${fields.Name}" style="height: 200px; object-fit: cover;">
                        
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h5 class="card-title fw-bold mb-0">${fields.Name}</h5>
                                <span class="badge bg-success">${fields.Price}</span>
                            </div>
                            
                            <p class="text-muted small mb-2">
                                <strong>📍 ${fields.Location}</strong>
                            </p>
                            
                            <p class="card-text flex-grow-1">${fields.Description}</p>
                            
                            <div class="mt-auto">
                                <hr class="my-2">
                                <p class="small mb-1"><strong>Specialty:</strong> ${fields['Special dishes'] || 'N/A'}</p>
                                <p class="small text-muted mb-3">${fields['Type of food']}</p>
                                
                                <a href="${fields.Yelp}" target="_blank" class="btn btn-outline-primary w-100">
                                    View on Yelp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add the card to the container
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        // If the Promise is rejected
        console.error("Failed to fetch Airtable data:", error);
        container.innerHTML = `
            <div class="col-12 text-center text-danger">
                <p>Sorry, we couldn't load the restaurants right now. Please check your connection or API keys.</p>
            </div>
        `;
    }
}

// ==========================================
// 3. EXECUTE THE FUNCTION
// ==========================================
// Call the async function when the script loads
loadRestaurants();