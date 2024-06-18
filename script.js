document.addEventListener('DOMContentLoaded', () => {
    const globalCases = document.getElementById('global-cases');
    const globalDeaths = document.getElementById('global-deaths');
    const globalRecovered = document.getElementById('global-recovered');
    const countryInput = document.getElementById('countryInput');
    const searchButton = document.getElementById('searchButton');
    const countryName = document.getElementById('countryName');
    const countryCases = document.getElementById('country-cases');
    const countryDeaths = document.getElementById('country-deaths');
    const countryRecovered = document.getElementById('country-recovered');
    const countryStats = document.getElementById('country-stats');
    const errorMessage = document.getElementById('error-message');

    // Fetch global data
    fetch('https://disease.sh/v3/covid-19/all')
        .then(response => response.json())
        .then(data => {
            globalCases.textContent = data.cases.toLocaleString();
            globalDeaths.textContent = data.deaths.toLocaleString();
            globalRecovered.textContent = data.recovered.toLocaleString();
        })
        .catch(error => console.error('Error fetching global data:', error));

    // Fetch country-specific data
    searchButton.addEventListener('click', () => {
        const country = countryInput.value.trim();
        if (country) {
            fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Country not found');
                    }
                    return response.json();
                })
                .then(data => {
                    countryName.textContent = data.country;
                    countryCases.textContent = data.cases.toLocaleString();
                    countryDeaths.textContent = data.deaths.toLocaleString();
                    countryRecovered.textContent = data.recovered.toLocaleString();
                    countryStats.style.display = 'block';
                    errorMessage.textContent = ''; // Clear error message
                })
                .catch(error => {
                    console.error('Error fetching country data:', error);
                    errorMessage.textContent = 'Country not found or invalid input';
                    countryStats.style.display = 'none';
                });
        } else {
            errorMessage.textContent = 'Please enter a country name';
            countryStats.style.display = 'none';
        }
    });
});
