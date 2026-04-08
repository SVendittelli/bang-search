// Custom bangs to be merged with DuckDuckGo bangs
// Add your custom bang definitions here

export const customBangs = [
  {
    d: "github.com",
    s: "Starling Bank GitHub Code Search",
    t: "ghsb",
    u: "https://github.com/search?q=org%3Astarlingbank+{{{s}}}&type=code",
  },
  {
    d: "github.com",
    s: "Starling Bank GitHub Repo Search",
    t: "ghsbr",
    u: "https://github.com/search?q=org%3Astarlingbank+{{{s}}}&type=repositories",
  },
  {
    d: "www.amazon.co.uk",
    s: "Amazon.co.uk",
    t: "a",
    u: "https://www.amazon.co.uk/s?k={{{s}}}",
  },
  {
    d: "www.amazon.co.uk",
    s: "Amazon.co.uk",
    t: "am",
    u: "https://www.amazon.co.uk/s?k={{{s}}}",
  },
  {
    d: "www.amazon.co.uk",
    s: "Amazon.co.uk order history",
    t: "amazonorders",
    u: "https://www.amazon.co.uk/gp/your-account/order-history/ref=oh_aui_search?opt=ab&search={{{s}}} ",
  },
  {
    d: "www.audible.co.uk",
    s: "Audible UK",
    t: "audible",
    u: "http://www.audible.co.uk/search/?advsearchKeywords={{{s}}}&filterby=field-keywords&x=0&y=0",
  },
  {
    d: "www.justwatch.com",
    s: "JustWatch UK",
    t: "jw",
    u: "https://www.justwatch.com/uk/search?q={{{s}}}",
  },
  {
    d: "www.justwatch.com",
    s: "JustWatch UK",
    t: "justwatch",
    u: "https://www.justwatch.com/uk/search?q={{{s}}}",
  },
  {
    d: "npmx",
    s: "npmx",
    t: "npmx",
    u: "https://npmx.dev/search?q={{{s}}}",
  },
];
