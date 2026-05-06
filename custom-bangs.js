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
    s: "Starling Bank GitHub Pull Request Search",
    t: "sbpr",
    u: "https://github.com/search?q=org%3Astarlingbank+{{{s}}}&type=pullrequests",
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
    u: "https://translate.google.com/?sl=auto&tl={{{l}}}&text={{{s}}}&op=translate",
  },
  {
    d: "translate.google.com",
    s: "Google Translate",
    t: "enit",
    u: "https://translate.google.com/?sl=auto&tl=en&text=it&op=translate",
  },
  {
    d: "translate.google.com",
    s: "Google Translate",
    t: "iten",
    u: "https://translate.google.com/?sl=auto&tl=it&text=en&op=translate",
  },
  // eBay UK
  {
    d: "www.ebay.co.uk",
    s: "eBay",
    t: "e",
    u: "https://www.ebay.co.uk/sch/i.html?_nkw={{{s}}}&LH_PrefLoc=1",
  },
  {
    d: "www.ebay.co.uk",
    s: "eBay",
    t: "eb",
    u: "https://www.ebay.co.uk/sch/i.html?_nkw={{{s}}}&LH_PrefLoc=1",
  },
  {
    d: "www.ebay.co.uk",
    s: "eBay",
    t: "ebay",
    u: "https://www.ebay.co.uk/sch/i.html?_nkw={{{s}}}&LH_PrefLoc=1",
  },
  {
    d: "www.ebay.co.uk",
    s: "eBay Sold",
    t: "ebaysold",
    u: "https://www.ebay.co.uk/sch/i.html?isRefine=true&_nkw={{{s}}}&LH_Sold=1",
  },
  // D&D Beyond
  {
    d: "www.dndbeyond.com",
    s: "D&D Beyond",
    t: "ddb",
    u: "https://www.dndbeyond.com/search?q={{{s}}}",
  },
  // Etsy UK location
  {
    d: "www.etsy.com",
    s: "Etsy",
    t: "etsy",
    u: "https://www.etsy.com/search?q={{{s}}}&locationQuery=2635167",
  },
  // Local library
  {
    d: "rbwm.spydus.co.uk",
    s: "RBWM Library",
    t: "lib",
    u: "https://rbwm.spydus.co.uk/cgi-bin/spydus.exe/ENQ/OPAC/BIBENQ?ENTRY={{{s}}}&ENTRY_NAME=BS&ENTRY_TYPE=K&SORTS=SQL_REL_BIB&GQ={{{s}}}&ISGLB=0&NRECS=10&QRY=&QRYTEXT=Full+catalogue&_SPQ=2",
  },
  // Government & Law
  {
    d: "www.gov.uk",
    s: "GOV.UK",
    t: "gov",
    u: "https://www.gov.uk/search?q={{{s}}}",
  },
  {
    d: "www.gov.uk",
    s: "GOV.UK",
    t: "govuk",
    u: "https://www.gov.uk/search?q={{{s}}}",
  },
  {
    d: "www.electoralcommission.org.uk",
    s: "The Electoral Commission Upcoming Elections",
    t: "elec",
    u: "https://www.electoralcommission.org.uk/polling-stations?postcode-search={{{s}}}",
  },
  {
    d: "www.legislation.gov.uk",
    s: "UK Legislation (Official Archive)",
    t: "law",
    u: "http://www.legislation.gov.uk/all?title={{{s}}}",
  },
  {
    d: "www.legislation.gov.uk",
    s: "UK Legislation (Official Archive)",
    t: "laws",
    u: "http://www.legislation.gov.uk/all?title={{{s}}}",
  },
  {
    d: "www.rbwm.gov.uk",
    s: "RBWM Council",
    t: "rbwm",
    u: "https://scripts.rbwm.gov.uk/scripts/search/?zoom_query=Bins&zoom_cat=3&op=Search",
  },
];
