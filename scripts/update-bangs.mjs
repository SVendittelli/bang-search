#!/usr/bin/env node

import { customBangs } from "../custom-bangs.js";
import {
  excludedBangs,
  excludedBangPatterns,
  excludedDomains,
} from "../excluded-bangs.js";
import { languages } from "../public/languages.js";
import { writeFileSync } from "fs";

const numberFormat = new Intl.NumberFormat("en-GB");

console.log("Downloading latest bangs from DuckDuckGo...");

// Fetch the latest bangs from DuckDuckGo
const response = await fetch("https://duckduckgo.com/bang.js");
if (!response.ok) {
  console.error(
    `Failed to fetch bangs: ${response.status} ${response.statusText}`,
  );
  process.exit(1);
}

const ddgBangs = await response.json();
console.log(
  `Downloaded ${numberFormat.format(ddgBangs.length)} bangs from DuckDuckGo`,
);

// Combine: custom bangs first, then DDG bangs, excluding some
const toRemove = excludedBangs.concat(customBangs.flatMap((b) => [b.t].flat()));
const expandedCustomBangs = customBangs.flatMap((b) =>
  Array.isArray(b.t) ? b.t.map((trigger) => ({ ...b, t: trigger })) : [b],
);
const combinedBangs = expandedCustomBangs.concat(
  ddgBangs.filter(
    ({ d, t }) =>
      !(
        excludedDomains.includes(d) ||
        toRemove.includes(t) ||
        excludedBangPatterns.some((re) => re.test(t))
      ),
  ),
);

console.log(
  `Merging ${numberFormat.format(customBangs.length)} custom bangs: ${customBangs.flatMap((b) => [b.t].flat()).join(", ")}`,
);
console.log(
  `Excluding ${numberFormat.format(ddgBangs.length + customBangs.length - combinedBangs.length)} DuckDuckGo bangs`,
);

/** Currencies supported by xe.com as of 2026-05-03. */
const currencies = [
  "GBP", // British Pound
  "EUR", // Euro
  "USD", // US Dollar
  "ADA", // Cardano
  "AED", // Emirati Dirham
  "AFN", // Afghan Afghani
  "ALL", // Albanian Lek
  "AMD", // Armenian Dram
  "AOA", // Angolan Kwanza
  "ARS", // Argentine Peso
  "AUD", // Australian Dollar
  "AWG", // Aruban or Dutch Guilder
  "AZN", // Azerbaijan Manat
  "BAM", // Bosnia-Herzegovina Convertible Mark
  "BBD", // Barbadian or Bajan Dollar
  "BCH", // Bitcoin Cash
  "BDT", // Bangladeshi Taka
  "BHD", // Bahraini Dinar
  "BIF", // Burundian Franc
  "BMD", // Bermudian Dollar
  "BND", // Bruneian Dollar
  "BOB", // Bolivian Bolíviano
  "BRL", // Brazilian Real
  "BSD", // Bahamian Dollar
  "BTC", // Bitcoin
  "BTN", // Bhutanese Ngultrum
  "BWP", // Botswana Pula
  "BYN", // Belarusian Ruble
  "BYR", // Belarusian Ruble
  "BZD", // Belizean Dollar
  "CAD", // Canadian Dollar
  "CDF", // Congolese Franc
  "CHF", // Swiss Franc
  "CLP", // Chilean Peso
  "CNY", // Chinese Yuan Renminbi
  "COP", // Colombian Peso
  "CRC", // Costa Rican Colon
  "CUC", // Cuban Convertible Peso
  "CUP", // Cuban Peso
  "CVE", // Cape Verdean Escudo
  "CZK", // Czech Koruna
  "DJF", // Djiboutian Franc
  "DKK", // Danish Krone
  "DOGE", // Dogecoin
  "DOP", // Dominican Peso
  "DOT", // Polkadot
  "DZD", // Algerian Dinar
  "EGP", // Egyptian Pound
  "ERN", // Eritrean Nakfa
  "ETB", // Ethiopian Birr
  "ETH", // Ethereum
  "FJD", // Fijian Dollar
  "FKP", // Falkland Island Pound
  "GEL", // Georgian Lari
  "GGP", // Guernsey Pound
  "GHS", // Ghanaian Cedi
  "GIP", // Gibraltar Pound
  "GMD", // Gambian Dalasi
  "GNF", // Guinean Franc
  "GTQ", // Guatemalan Quetzal
  "GYD", // Guyanese Dollar
  "HKD", // Hong Kong Dollar
  "HNL", // Honduran Lempira
  "HTG", // Haitian Gourde
  "HUF", // Hungarian Forint
  "IDR", // Indonesian Rupiah
  "ILS", // Israeli Shekel
  "IMP", // Isle of Man Pound
  "INR", // Indian Rupee
  "IQD", // Iraqi Dinar
  "IRR", // Iranian Rial
  "ISK", // Icelandic Krona
  "JEP", // Jersey Pound
  "JMD", // Jamaican Dollar
  "JOD", // Jordanian Dinar
  "JPY", // Japanese Yen
  "KES", // Kenyan Shilling
  "KGS", // Kyrgyzstani Som
  "KHR", // Cambodian Riel
  "KMF", // Comorian Franc
  "KPW", // North Korean Won
  "KRW", // South Korean Won
  "KWD", // Kuwaiti Dinar
  "KYD", // Caymanian Dollar
  "KZT", // Kazakhstani Tenge
  "LAK", // Lao Kip
  "LBP", // Lebanese Pound
  "LINK", // Chainlink
  "LKR", // Sri Lankan Rupee
  "LRD", // Liberian Dollar
  "LSL", // Basotho Loti
  "LTC", // Litecoin
  "LTL", // Lithuanian Litas
  "LUNA", // Terra
  "LVL", // Latvian Lat
  "LYD", // Libyan Dinar
  "MAD", // Moroccan Dirham
  "MDL", // Moldovan Leu
  "MGA", // Malagasy Ariary
  "MKD", // Macedonian Denar
  "MMK", // Burmese Kyat
  "MNT", // Mongolian Tughrik
  "MOP", // Macau Pataca
  "MRU", // Mauritanian Ouguiya
  "MUR", // Mauritian Rupee
  "MVR", // Maldivian Rufiyaa
  "MWK", // Malawian Kwacha
  "MXN", // Mexican Peso
  "MYR", // Malaysian Ringgit
  "MZN", // Mozambican Metical
  "NAD", // Namibian Dollar
  "NGN", // Nigerian Naira
  "NIO", // Nicaraguan Cordoba
  "NOK", // Norwegian Krone
  "NPR", // Nepalese Rupee
  "NZD", // New Zealand Dollar
  "OMR", // Omani Rial
  "PAB", // Panamanian Balboa
  "PEN", // Peruvian Sol
  "PGK", // Papua New Guinean Kina
  "PHP", // Philippine Peso
  "PKR", // Pakistani Rupee
  "PLN", // Polish Zloty
  "PYG", // Paraguayan Guarani
  "QAR", // Qatari Riyal
  "RON", // Romanian Leu
  "RSD", // Serbian Dinar
  "RUB", // Russian Ruble
  "RWF", // Rwandan Franc
  "SAR", // Saudi Arabian Riyal
  "SBD", // Solomon Islander Dollar
  "SCR", // Seychellois Rupee
  "SDG", // Sudanese Pound
  "SEK", // Swedish Krona
  "SGD", // Singapore Dollar
  "SHP", // Saint Helenian Pound
  "SLE", // Sierra Leonean Leone
  "SLL", // Sierra Leonean Leone
  "SOS", // Somali Shilling
  "SPL", // Seborgan Luigino
  "SRD", // Surinamese Dollar
  "STN", // Sao Tomean Dobra
  "SVC", // Salvadoran Colon
  "SYP", // Syrian Pound
  "SZL", // Swazi Lilangeni
  "THB", // Thai Baht
  "TJS", // Tajikistani Somoni
  "TMT", // Turkmenistani Manat
  "TND", // Tunisian Dinar
  "TOP", // Tongan Pa’anga
  "TRY", // Turkish Lira
  "TTD", // Trinidadian Dollar
  "TVD", // Tuvaluan Dollar
  "TWD", // Taiwan New Dollar
  "TZS", // Tanzanian Shilling
  "UAH", // Ukrainian Hryvnia
  "UGX", // Ugandan Shilling
  "UNI", // Uniswap
  "UYU", // Uruguayan Peso
  "UZS", // Uzbekistani Som
  "VES", // Venezuelan Bolívar
  "VND", // Vietnamese Dong
  "VUV", // Ni-Vanuatu Vatu
  "WST", // Samoan Tala
  "XAF", // Central African CFA Franc BEAC
  "XAG", // Silver Ounce
  "XAU", // Gold Ounce
  "XCD", // East Caribbean Dollar
  "XCG", // Caribbean Guilder
  "XDR", // IMF Special Drawing Rights
  "XLM", // Stellar Lumen
  "XOF", // CFA Franc
  "XPD", // Palladium Ounce
  "XPF", // CFP Franc
  "XPT", // Platinum Ounce
  "XRP", // Ripple
  "YER", // Yemeni Rial
  "ZAR", // South African Rand
  "ZMK", // Zambian Kwacha
  "ZMW", // Zambian Kwacha
  "ZWG", // Zimbabwean Dollar
];

const currenciesBangs = [];
for (const from of currencies) {
  for (const to of currencies) {
    if (from === to) continue;
    currenciesBangs.push({
      d: "www.xe.com",
      s: "XE",
      t: `${from.toLocaleLowerCase()}2${to.toLocaleLowerCase()}`,
      u: `http://www.xe.com/en-gb/currencyconverter/convert/?From=${from}&To=${to}&Amount={{{s}}}`,
    });
  }
}
console.log(
  `Supporting ${numberFormat.format(currencies.length)} currencies to convert`,
);

const translateBangs = [];
for (const { languageCode: to } of languages.filter((l) => l.supportTarget)) {
  translateBangs.push({
    d: "translate.google.com",
    s: "Google Translate",
    t: `trt-${to}`,
    u: `https://translate.google.com/?sl={{{l}}}&tl=${to}&text={{{s}}}&op=translate`,
  });
}
for (const { languageCode: from } of languages.filter((l) => l.supportSource)) {
  translateBangs.push({
    d: "translate.google.com",
    s: "Google Translate",
    t: `trf-${from}`,
    u: `https://translate.google.com/?sl=${from}&tl={{{l}}}&text={{{s}}}&op=translate`,
  });
}
console.log(
  `Supporting ${numberFormat.format(languages.length)} languages to translate`,
);

// Format the output file (minified)
const output = `// This file was (mostly) ripped from https://duckduckgo.com/bang.js

export const bangs = ${JSON.stringify(combinedBangs, ["d", "s", "t", "u"], 2)};

export const currencyBangs = ${JSON.stringify(currenciesBangs, ["d", "s", "t", "u"], 2)};

export const translateBangs = ${JSON.stringify(translateBangs, ["d", "s", "t", "u"], 2)};
`;

// Write the updated bang.js
writeFileSync("public/bang.js", output, "utf8");

console.log(
  `Done! Updated public/bang.js with ${numberFormat.format(combinedBangs.length + currenciesBangs.length + translateBangs.length)} total bangs`,
);
