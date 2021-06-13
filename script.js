
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []
let apiQuotesAvailable = false

// Loading Animation
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

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
    loading()

    // Retrieve new quote from either local or api list
    newQuote = {}
    if (apiQuotesAvailable === true) {
        newQuote = useApiQuote();
    }
    else {
        newQuote = useLocalQuote();
    };

    // Populate quote container
    authorText.textContent = newQuote.author;
    quoteText.textContent = newQuote.text;
    hideLoading()
}

// Get Quotes from API
async function getQuotes() {
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
        console.log("Error in getQuotes: ", error)
        console.log("Using local quotes only.")
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', writeNewQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
writeNewQuote();
getQuotes();
