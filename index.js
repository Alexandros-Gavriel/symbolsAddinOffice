document.addEventListener('DOMContentLoaded', () => {
    const categoryMenu = document.getElementById('categoryMenu');
    const symbolsList = document.getElementById('symbolsList');
    const categories = ['All', 'Arrow', 'Currency', 'Drawing', 'Html4', 'Icons', 'Letters', 'Mathsymbols', 'Miscellaneous', 'Punctuation'];
    let allSymbols = [];

    // Create category buttons
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category;
        button.addEventListener('click', () => {
            displaySymbols(category);
        });
        categoryMenu.appendChild(button);
    });

    // Load symbols from JSON files
    categories.slice(1).forEach(category => {
        loadSymbols(category);
    });

    function loadSymbols(category) {
        fetch(`${category}Symbols.json`)
            .then(response => response.json())
            .then(data => {
                allSymbols = [...allSymbols, ...data];
                if (category === 'Punctuation') { // Assuming Punctuation is the last one
                    displaySymbols('All');
                }
            })
            .catch(error => console.error('Error loading symbols:', error));
    }

    function displaySymbols(category) {
        symbolsList.innerHTML = ''; // Clear the list
        const filteredSymbols = category === 'All' ? allSymbols : allSymbols.filter(symbol => symbol.category === category);
        filteredSymbols.forEach(symbol => {
            const symbolElement = document.createElement('div');
            symbolElement.innerHTML = symbol.symbol;
            symbolElement.className = 'symbol';
            symbolElement.addEventListener('click', () => {
                copyToClipboard(symbol.symbol);
            });
            symbolsList.appendChild(symbolElement);
        });
    }

    // function copyToClipboard(text) {
    //     navigator.clipboard.writeText(text).then(() => {
    //         console.log(`Copied to clipboard: ${text}`);
    //     }).catch(err => {
    //         console.error('Could not copy text: ', err);
    //     });
    // }

    function copyToClipboardFallback(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
    
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
    
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
    
        document.body.removeChild(textArea);
    }
    

    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            copyToClipboardFallback(text);
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            console.log(`Copied to clipboard: ${text}`);
        }).catch(err => {
            console.error('Could not copy text: ', err);
            // Fallback if the Clipboard API is not available
            copyToClipboardFallback(text);
        });
    }
    
});
