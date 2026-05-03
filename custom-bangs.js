/** Custom bangs to be merged with DuckDuckGo bangs. */
export const customBangs = [
  // Use UK Google
  {
    d: "www.google.co.uk",
    s: "Google",
    t: "g",
    u: "https://www.google.co.uk/search?q={{{s}}}",
  },
  {
    d: "maps.google.co.uk",
    s: "Google Maps",
    t: "m",
    u: "https://maps.google.co.uk/maps?q={{{s}}}",
  },
  {
    d: "maps.google.co.uk",
    s: "Google Maps",
    t: "gm",
    u: "https://maps.google.co.uk/maps?q={{{s}}}",
  },
  {
    d: "maps.google.co.uk",
    s: "Google Maps",
    t: "maps",
    u: "https://maps.google.co.uk/maps?q={{{s}}}",
  },
  // Work
  {
    d: "github.com",
    s: "Starling Bank GitHub Code Search",
    t: "sb",
    u: "https://github.com/search?q=org%3Astarlingbank+{{{s}}}&type=code",
  },
  {
    d: "github.com",
    s: "Starling Bank GitHub Repo Search",
    t: "sbr",
    u: "https://github.com/search?q=org%3Astarlingbank+{{{s}}}&type=repositories",
  },
  {
    d: "starlingbank.atlassian.net",
    s: "Starling Bank Confluence",
    t: "sbw",
    u: "https://starlingbank.atlassian.net/wiki/search?text={{{s}}}",
  },
  // Use UK amazon
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
    t: "au",
    u: "http://www.audible.co.uk/search/?advsearchKeywords={{{s}}}&filterby=field-keywords&x=0&y=0",
  },
  {
    d: "www.audible.co.uk",
    s: "Audible UK",
    t: "audible",
    u: "http://www.audible.co.uk/search/?advsearchKeywords={{{s}}}&filterby=field-keywords&x=0&y=0",
  },
  // Use UK justwatch
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
  // Add npmx
  {
    d: "npmx",
    s: "npmx",
    t: "npmx",
    u: "https://npmx.dev/search?q={{{s}}}",
  },
  // Cloud storage (fix OneDrive)
  {
    d: "onedrive.live.com",
    s: "OneDrive",
    t: "onedrive",
    u: "https://onedrive.live.com/?q={{{s}}}&view=7",
  },
  {
    d: "onedrive.live.com",
    s: "OneDrive",
    t: "od",
    u: "https://onedrive.live.com/?q={{{s}}}&view=7",
  },
  {
    d: "onedrive.live.com",
    s: "OneDrive",
    t: "1d",
    u: "https://onedrive.live.com/?q={{{s}}}&view=7",
  },
  // AI
  {
    d: "claude.ai",
    s: "Claude",
    t: "ai",
    u: "https://claude.ai/new?q={{{s}}}",
  },
  {
    d: "claude.ai",
    s: "Claude",
    t: "c",
    u: "https://claude.ai/new?q={{{s}}}",
  },
  // Translate
  {
    d: "translate.google.com",
    s: "Google Translate",
    t: "tr",
    u: "https://translate.google.com/?sl=auto&tl=en&text={{{s}}}&op=translate",
  },
];

/** Bangs that DuckDuckGo provides which I wish to exclude. */
export const excludedBangs = ["thb"];
