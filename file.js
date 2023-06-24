
const TableBody = document.getElementById('table-body');

const searchInput = document.getElementById('search-input');

const sortByMarketCap = document.getElementById('sort-market-cap-button');

const sortByPercentage = document.getElementById('sort-percentage-change-button');

let array = [];

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(response => response.json())
.then(data => {
        array = data.map(item => ({
            logo : item.image,
            name : item.name,
            id : item.symbol,
            currentPrice : item.current_price,
            marketCap : item.market_cap,
            percentageChange24h : item.market_cap_change_percentage_24h
        }));
        renderTable(array);
    })

    .catch(error =>{
        console.error('Error:' ,error)
    });


async function fetchData()
{
    try{
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();

            array = data.map(item => ({
            logo : item.image,
            name : item.name,
            id : item.symbol,
            currentPrice : item.current_price,
            marketCap : item.market_cap,
            percentageChange24h : item.market_cap_change_percentage_24h           
        }));
        renderTable(array);
    }
    catch(error) {
        console.error('Error:' ,error)
    }
}


// ---------------------------- Search By Name or Symbol  ---------------------------------------

searchInput.addEventListener('input' , () => {
    const searchValue = searchInput.value.toLowerCase();
    const filterData = array.filter(data => data.name.toLowerCase().includes(searchValue));
    renderTable(filterData);
})


// ----------------------------- Sort By Mkt Cap  -----------------------------------------------

sortByMarketCap.addEventListener('click' , () => {
    const sortedElements = [...array].sort((a,b) => a.marketCap - b.marketCap);
    renderTable(sortedElements);
});

// ------------------------  Sort By % Change ---------------------------------------------------

sortByPercentage.addEventListener('click' , () => {
    const sortedElements = [...array].sort((a,b) => a.percentageChange24h - b.percentageChange24h);
    renderTable(sortedElements);
});


// -------------------------- Table Body ---------------------------------------------------------

function renderTable(data){
    TableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        const logoCell = document.createElement('td');
        const logoImg = document.createElement('img');
        logoImg.src = item.logo;
        logoImg.alt = item.name;
        logoCell.appendChild(logoImg);
        row.appendChild(logoCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

            const idCell = document.createElement('td');
            idCell.textContent = item.id.toUpperCase();
            row.appendChild(idCell);

        const currentPriceCell = document.createElement('td');
        currentPriceCell.textContent = '$' + item.currentPrice;
        row.appendChild(currentPriceCell);

            const percentageChange24hCell = document.createElement('td');
            percentageChange24hCell.textContent = item.percentageChange24h.toFixed(2) + '%';

            if(item.percentageChange24h <= 0){
                percentageChange24hCell.style.color = 'red';
            }
            else{
                percentageChange24hCell.style.color = 'green';
            }

            row.appendChild(percentageChange24hCell);

        const marketCapCell = document.createElement('td');  
        marketCapCell.textContent = 'Mkt Cap: $' + item.marketCap;
        row.appendChild(marketCapCell);

        TableBody.appendChild(row);
    });

}

