


// const apiKey = 'e312cd7834bdef4f8fcfd130d49f4b4b';
// const baseCurrency = 'AED';
// const currencies = 'AED,USD,SAR';
// const url = `https://api.forexrateapi.com/v1/latest?api_key=${apiKey}&base=${baseCurrency}&currencies=${currencies}`;

// let exchangeRates = {};

// async function fetchExchangeRates() {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         exchangeRates = {
//             AED: 1, 
//             USD: data.rates.USD,
//             SAR: data.rates.SAR,
//         };
//         updatePrices(); 
//     } catch (error) {
//         console.error('Error fetching exchange rates:', error);
//     }
// }

// function convertPrice(price, currency) {
//     return price * (exchangeRates[currency] || 1);
// }

// function updatePrices() {
//     const selectedCurrency = document.getElementById('currency').value;
//     const products = [
//       { id: 'price_1', price: 29 },
//       { id: 'price_2', price: 81 },
//       { id: 'price_3', price: 85 },
//       { id: 'price_4', price: 105 },
//       { id: 'price_5', price: 25 },
//       { id: 'price_6', price: 142},
//       { id: 'price_7', price: 94},
//       { id: 'price_8', price: 25},
//       { id: 'price_9', price: 64},
//       { id: 'price_10', price: 93},
//       { id: 'price_11', price: 87},
//       { id: 'price_12', price: 107},
//       { id: 'price_13', price: 64},
//       { id: 'price_14', price: 85},
//       { id: 'price_15', price: 131},
//       { id: 'price_16', price: 138},
//       { id: 'price_17', price: 109 },
//       { id: 'price_18', price: 105 },
//       { id: 'price_19', price: 78 },
//       { id: 'price_20', price: 138 },
//       { id: 'price_21', price: 125 },
//       { id: 'price_22', price: 133 },
//       { id: 'price_23', price: 124 },
//     ];

//     products.forEach(({ id, price }) => {
//         const updatedPrice = convertPrice(price, selectedCurrency);
//         document.getElementById(id).textContent = `${updatedPrice.toFixed(2)} ${selectedCurrency}`;
//     });
// }

// document.addEventListener('DOMContentLoaded', fetchExchangeRates);


function updatePrices() {
    const currencySelect = document.getElementById("currency");
    const selectedCurrency = currencySelect.value;

    const exchangeRates = {
        AED: 1,
        USD: 0.27,
        SAR: 1.02
    };

    const allPrices = document.querySelectorAll(".price, .new-price, .old-price");

    allPrices.forEach(priceElement => {
        const currentPriceText = priceElement.textContent.trim();

        const priceParts = currentPriceText.split(" ");
        const currentPrice = parseFloat(priceParts[0]);
        const currentCurrency = priceParts[1];

        if (!isNaN(currentPrice) && currentCurrency in exchangeRates) {
            const basePrice = currentPrice / exchangeRates[currentCurrency];
            const newPrice = Math.round(basePrice * exchangeRates[selectedCurrency]);
            priceElement.textContent = `${newPrice} ${selectedCurrency}`;
        }
    });
}



