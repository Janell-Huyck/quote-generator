
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')


let apiQuotes = []
let apiQuotesAvailable = false

// Select New Quote

function useLocalQuote() {
    let newQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    return newQuote;
}

function useApiQuote() {
    let newQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return newQuote;
}

// Dynamically Write New Quote

function writeNewQuote() {
    // Retrieve new quote from either local or api list
    newQuote = {}
    if (apiQuotesAvailable === true) {
        newQuote = useApiQuote();
    }
    else {
        newQuote = useLocalQuote();
    };

    // Make "null" authors show as "Unknown"
    if (newQuote.author == null) {
        newQuote.author = "Unknown"
    }
    
    // Populate quote container
    console.log(apiQuotesAvailable);
    console.log(newQuote);
    authorText.textContent = newQuote.author;
    quoteText.textContent = newQuote.text;

}

// Get Quotes from API

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json()
        apiQuotes = apiQuotes.filter(quote => quote.author !== "Donald Trump" );
        apiQuotesAvailable = true
    } catch (error) {
        console.log("Error in getQuotes: ", error)
        console.log("Using local quotes only.")
    }
}

// On Load
writeNewQuote();
getQuotes();