document.addEventListener('DOMContentLoaded', () => {
    const categoryMenu = document.getElementById('categoryMenu');
    const symbolsList = document.getElementById('symbolsList');
    const categories = ['All', 'Arrow', 'Currency', 'Drawing', 'Html4', 'Icons', 'Letters', 'Mathsymbols', 'Miscellaneous', 'Punctuation'];
    let allSymbols = [];

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => displaySymbols(category));
        categoryMenu.appendChild(button);
    });

    categories.slice(1).forEach(category => {
        loadSymbols(category);
    });

    function loadSymbols(category) {
        fetch(`${category}Symbols.json`)
            .then(response => response.json())
            .then(data => {
                allSymbols = [...allSymbols, ...data];
                if (category === 'Punctuation') {
                    displaySymbols('All');
                }
            })
            .catch(error => console.error('Error loading symbols:', error));
    }

    function displaySymbols(category) {
        symbolsList.innerHTML = '';
        const filteredSymbols = category === 'All' ? allSymbols : allSymbols.filter(symbol => symbol.category === category);
        filteredSymbols.forEach(symbol => {
            const symbolElement = document.createElement('div');
            symbolElement.innerHTML = symbol.symbol;
            symbolElement.className = 'symbol';
            symbolElement.addEventListener('click', () => {
                // Here we will call the function from officeInteraction.js
                insertSymbolIntoEmail(symbol.symbol);
            });
            symbolsList.appendChild(symbolElement);
        });
    }
});
