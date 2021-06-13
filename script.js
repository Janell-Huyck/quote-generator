
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []
let newQuote = {}
let apiQuotesAvailable = false

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

function useLocalQuote() {
    let newQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    return newQuote;
}

function useApiQuote() {
    let newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return newQuote;
}

function writeNewQuote() {
    showLoadingSpinner()

    if (apiQuotesAvailable === true) {
        newQuote = useApiQuote();
    }
    else {
        newQuote = useLocalQuote();
    };

    authorText.textContent = newQuote.author;
    quoteText.textContent = newQuote.text;

    hideLoadingSpinner()
}

async function downloadQuotesFromApi() {
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        
        // Remove controversial quotes
        apiQuotes = apiQuotes.filter(quote => quote.author !== "Donald Trump" );
        
        // Make "null" authors show as "Unknown"
        apiQuotes.forEach( apiQuote => {!apiQuote.author ? apiQuote.author = "Unknown" : apiQuote.author})

        apiQuotesAvailable = true
    } catch (error) {
        console.log("Error in downloadQuotesFromApi: ", error)
        console.log("Using local quotes only.")
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', writeNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load - Show a locally stored quote first for speed, and download API quotes in background
writeNewQuote();
downloadQuotesFromApi();
