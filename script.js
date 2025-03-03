/* Log Popup */

function openAddLog(){
    document.getElementById("myPopup").style.display = "block";
}

function closeAddLog(){
    document.getElementById("myPopup").style.display = "none";
}

/* Roadmap Popup */

function openRoadmap(){
    document.getElementById("roadmap-popup").style.display = "block";
}

function closeRoadmap(){
    document.getElementById("roadmap-popup").style.display = "none";
}

/* Search functionality */
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-input');
    const resultsDiv = document.getElementById('results');
    
    window.searchBooks = async () => {
        const query = searchBox.value.trim();
        const apiUrl = `http://127.0.0.1:5000/api/record?title=${encodeURIComponent(query)}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            resultsDiv.innerHTML = '';

            if(data.length > 0) {
                data.forEach(record => {
                    const [title, image, author, pages, genre, band] = record;
                    const recordElement = document.createElement('p');
                    recordElement.textContent = `Title: ${title}, Author: ${author}, Pages: ${pages}, Genre: ${genre}, Band: ${band}`;
                    resultsDiv.appendChild(recordElement);
                });
            } else {
                resultsDiv.textContent = 'No results found';
            }
        } catch (error) {
            resultsDiv.textContent = 'Error fetching data.';
            console.error('Error fetching data:', error);
        }
    };
});