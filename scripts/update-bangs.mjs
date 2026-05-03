#!/usr/bin/env node

import { customBangs, excludedBangs } from "../custom-bangs.js";
import { writeFileSync } from "fs";

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
console.log(`Downloaded ${ddgBangs.length} bangs from DuckDuckGo`);

if (excludedBangs.length) {
  console.log(
    `Excluding ${excludedBangs.length} DuckDuckGo bangs: ${excludedBangs.join(", ")}`,
  );
}
if (customBangs.length > 0) {
  console.log(
    `Merging ${customBangs.length} custom bangs: ${customBangs.map((b) => b.t).join(", ")}`,
  );
}

// Combine: custom bangs first, then DDG bangs, excluding some
const toRemove = excludedBangs.concat(customBangs.map((b) => b.t));
const combinedBangs = customBangs.concat(
  ddgBangs.filter(
    ({ d, t }) =>
      !(
        d === "www.xe.com" ||
        d === "translate.google.com" ||
        toRemove.includes(t)
      ),
  ),
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
if (customBangs.length > 0) {
  console.log(`Supporting ${currencies.length} currencies to convert`);
}

/**
 * From the Google API as of 2026-05-03.
 * https://docs.cloud.google.com/translate/docs/list-supported-languages?usertype=Advanced#list_advanced
 */
const languages = [
  { languageCode: "ab", supportSource: true, supportTarget: true },
  { languageCode: "ace", supportSource: true, supportTarget: true },
  { languageCode: "ach", supportSource: true, supportTarget: true },
  { languageCode: "af", supportSource: true, supportTarget: true },
  { languageCode: "ak", supportSource: true, supportTarget: true },
  { languageCode: "alz", supportSource: true, supportTarget: true },
  { languageCode: "am", supportSource: true, supportTarget: true },
  { languageCode: "ar", supportSource: true, supportTarget: true },
  { languageCode: "as", supportSource: true, supportTarget: true },
  { languageCode: "awa", supportSource: true, supportTarget: true },
  { languageCode: "ay", supportSource: true, supportTarget: true },
  { languageCode: "az", supportSource: true, supportTarget: true },
  { languageCode: "ba", supportSource: true, supportTarget: true },
  { languageCode: "ban", supportSource: true, supportTarget: true },
  { languageCode: "bbc", supportSource: true, supportTarget: true },
  { languageCode: "be", supportSource: true, supportTarget: true },
  { languageCode: "bem", supportSource: true, supportTarget: true },
  { languageCode: "bew", supportSource: true, supportTarget: true },
  { languageCode: "bg", supportSource: true, supportTarget: true },
  { languageCode: "bho", supportSource: true, supportTarget: true },
  { languageCode: "bik", supportSource: true, supportTarget: true },
  { languageCode: "bm", supportSource: true, supportTarget: true },
  { languageCode: "bn", supportSource: true, supportTarget: true },
  { languageCode: "br", supportSource: true, supportTarget: true },
  { languageCode: "bs", supportSource: true, supportTarget: true },
  { languageCode: "bts", supportSource: true, supportTarget: true },
  { languageCode: "btx", supportSource: true, supportTarget: true },
  { languageCode: "bua", supportSource: true, supportTarget: true },
  { languageCode: "ca", supportSource: true, supportTarget: true },
  { languageCode: "ceb", supportSource: true, supportTarget: true },
  { languageCode: "cgg", supportSource: true, supportTarget: true },
  { languageCode: "chm", supportSource: true, supportTarget: true },
  { languageCode: "ckb", supportSource: true, supportTarget: true },
  { languageCode: "cnh", supportSource: true, supportTarget: true },
  { languageCode: "co", supportSource: true, supportTarget: true },
  { languageCode: "crh", supportSource: true, supportTarget: true },
  { languageCode: "crs", supportSource: true, supportTarget: true },
  { languageCode: "cs", supportSource: true, supportTarget: true },
  { languageCode: "cv", supportSource: true, supportTarget: true },
  { languageCode: "cy", supportSource: true, supportTarget: true },
  { languageCode: "da", supportSource: true, supportTarget: true },
  { languageCode: "de", supportSource: true, supportTarget: true },
  { languageCode: "din", supportSource: true, supportTarget: true },
  { languageCode: "doi", supportSource: true, supportTarget: true },
  { languageCode: "dov", supportSource: true, supportTarget: true },
  { languageCode: "dv", supportSource: true, supportTarget: true },
  { languageCode: "dz", supportSource: true, supportTarget: true },
  { languageCode: "ee", supportSource: true, supportTarget: true },
  { languageCode: "el", supportSource: true, supportTarget: true },
  { languageCode: "en", supportSource: true, supportTarget: true },
  { languageCode: "eo", supportSource: true, supportTarget: true },
  { languageCode: "es", supportSource: true, supportTarget: true },
  { languageCode: "et", supportSource: true, supportTarget: true },
  { languageCode: "eu", supportSource: true, supportTarget: true },
  { languageCode: "fa", supportSource: true, supportTarget: true },
  { languageCode: "ff", supportSource: true, supportTarget: true },
  { languageCode: "fi", supportSource: true, supportTarget: true },
  { languageCode: "fil", supportSource: true, supportTarget: true },
  { languageCode: "fj", supportSource: true, supportTarget: true },
  { languageCode: "fr", supportSource: true, supportTarget: true },
  { languageCode: "fr-CA", supportSource: true, supportTarget: true },
  { languageCode: "fy", supportSource: true, supportTarget: true },
  { languageCode: "ga", supportSource: true, supportTarget: true },
  { languageCode: "gaa", supportSource: true, supportTarget: true },
  { languageCode: "gd", supportSource: true, supportTarget: true },
  { languageCode: "gl", supportSource: true, supportTarget: true },
  { languageCode: "gn", supportSource: true, supportTarget: true },
  { languageCode: "gom", supportSource: true, supportTarget: true },
  { languageCode: "gu", supportSource: true, supportTarget: true },
  { languageCode: "ha", supportSource: true, supportTarget: true },
  { languageCode: "haw", supportSource: true, supportTarget: true },
  { languageCode: "he", supportSource: true, supportTarget: true },
  { languageCode: "hi", supportSource: true, supportTarget: true },
  { languageCode: "hil", supportSource: true, supportTarget: true },
  { languageCode: "hmn", supportSource: true, supportTarget: true },
  { languageCode: "hr", supportSource: true, supportTarget: true },
  { languageCode: "hrx", supportSource: true, supportTarget: true },
  { languageCode: "ht", supportSource: true, supportTarget: true },
  { languageCode: "hu", supportSource: true, supportTarget: true },
  { languageCode: "hy", supportSource: true, supportTarget: true },
  { languageCode: "id", supportSource: true, supportTarget: true },
  { languageCode: "ig", supportSource: true, supportTarget: true },
  { languageCode: "ilo", supportSource: true, supportTarget: true },
  { languageCode: "is", supportSource: true, supportTarget: true },
  { languageCode: "it", supportSource: true, supportTarget: true },
  { languageCode: "iw", supportSource: true, supportTarget: true },
  { languageCode: "ja", supportSource: true, supportTarget: true },
  { languageCode: "jv", supportSource: true, supportTarget: true },
  { languageCode: "jw", supportSource: true, supportTarget: true },
  { languageCode: "ka", supportSource: true, supportTarget: true },
  { languageCode: "kk", supportSource: true, supportTarget: true },
  { languageCode: "km", supportSource: true, supportTarget: true },
  { languageCode: "kn", supportSource: true, supportTarget: true },
  { languageCode: "ko", supportSource: true, supportTarget: true },
  { languageCode: "kri", supportSource: true, supportTarget: true },
  { languageCode: "ktu", supportSource: true, supportTarget: true },
  { languageCode: "ku", supportSource: true, supportTarget: true },
  { languageCode: "ky", supportSource: true, supportTarget: true },
  { languageCode: "la", supportSource: true, supportTarget: true },
  { languageCode: "lb", supportSource: true, supportTarget: true },
  { languageCode: "lg", supportSource: true, supportTarget: true },
  { languageCode: "li", supportSource: true, supportTarget: true },
  { languageCode: "lij", supportSource: true, supportTarget: true },
  { languageCode: "lmo", supportSource: true, supportTarget: true },
  { languageCode: "ln", supportSource: true, supportTarget: true },
  { languageCode: "lo", supportSource: true, supportTarget: true },
  { languageCode: "lt", supportSource: true, supportTarget: true },
  { languageCode: "ltg", supportSource: true, supportTarget: true },
  { languageCode: "luo", supportSource: true, supportTarget: true },
  { languageCode: "lus", supportSource: true, supportTarget: true },
  { languageCode: "lv", supportSource: true, supportTarget: true },
  { languageCode: "mai", supportSource: true, supportTarget: true },
  { languageCode: "mak", supportSource: true, supportTarget: true },
  { languageCode: "mg", supportSource: true, supportTarget: true },
  { languageCode: "mi", supportSource: true, supportTarget: true },
  { languageCode: "min", supportSource: true, supportTarget: true },
  { languageCode: "mk", supportSource: true, supportTarget: true },
  { languageCode: "ml", supportSource: true, supportTarget: true },
  { languageCode: "mn", supportSource: true, supportTarget: true },
  { languageCode: "mni-Mtei", supportSource: true, supportTarget: true },
  { languageCode: "mr", supportSource: true, supportTarget: true },
  { languageCode: "ms", supportSource: true, supportTarget: true },
  { languageCode: "ms-Arab", supportSource: true, supportTarget: true },
  { languageCode: "mt", supportSource: true, supportTarget: true },
  { languageCode: "my", supportSource: true, supportTarget: true },
  { languageCode: "ne", supportSource: true, supportTarget: true },
  { languageCode: "new", supportSource: true, supportTarget: true },
  { languageCode: "nl", supportSource: true, supportTarget: true },
  { languageCode: "no", supportSource: true, supportTarget: true },
  { languageCode: "nr", supportSource: true, supportTarget: true },
  { languageCode: "nso", supportSource: true, supportTarget: true },
  { languageCode: "nus", supportSource: true, supportTarget: true },
  { languageCode: "ny", supportSource: true, supportTarget: true },
  { languageCode: "oc", supportSource: true, supportTarget: true },
  { languageCode: "om", supportSource: true, supportTarget: true },
  { languageCode: "or", supportSource: true, supportTarget: true },
  { languageCode: "pa", supportSource: true, supportTarget: true },
  { languageCode: "pa-Arab", supportSource: true, supportTarget: true },
  { languageCode: "pag", supportSource: true, supportTarget: true },
  { languageCode: "pam", supportSource: true, supportTarget: true },
  { languageCode: "pap", supportSource: true, supportTarget: true },
  { languageCode: "pl", supportSource: true, supportTarget: true },
  { languageCode: "ps", supportSource: true, supportTarget: true },
  { languageCode: "pt", supportSource: true, supportTarget: true },
  { languageCode: "pt-PT", supportSource: true, supportTarget: true },
  { languageCode: "qu", supportSource: true, supportTarget: true },
  { languageCode: "rn", supportSource: true, supportTarget: true },
  { languageCode: "ro", supportSource: true, supportTarget: true },
  { languageCode: "rom", supportSource: true, supportTarget: true },
  { languageCode: "ru", supportSource: true, supportTarget: true },
  { languageCode: "rw", supportSource: true, supportTarget: true },
  { languageCode: "sa", supportSource: true, supportTarget: true },
  { languageCode: "scn", supportSource: true, supportTarget: true },
  { languageCode: "sd", supportSource: true, supportTarget: true },
  { languageCode: "sg", supportSource: true, supportTarget: true },
  { languageCode: "shn", supportSource: true, supportTarget: true },
  { languageCode: "si", supportSource: true, supportTarget: true },
  { languageCode: "sk", supportSource: true, supportTarget: true },
  { languageCode: "sl", supportSource: true, supportTarget: true },
  { languageCode: "sm", supportSource: true, supportTarget: true },
  { languageCode: "sn", supportSource: true, supportTarget: true },
  { languageCode: "so", supportSource: true, supportTarget: true },
  { languageCode: "sq", supportSource: true, supportTarget: true },
  { languageCode: "sr", supportSource: true, supportTarget: true },
  { languageCode: "ss", supportSource: true, supportTarget: true },
  { languageCode: "st", supportSource: true, supportTarget: true },
  { languageCode: "su", supportSource: true, supportTarget: true },
  { languageCode: "sv", supportSource: true, supportTarget: true },
  { languageCode: "sw", supportSource: true, supportTarget: true },
  { languageCode: "szl", supportSource: true, supportTarget: true },
  { languageCode: "ta", supportSource: true, supportTarget: true },
  { languageCode: "te", supportSource: true, supportTarget: true },
  { languageCode: "tet", supportSource: true, supportTarget: true },
  { languageCode: "tg", supportSource: true, supportTarget: true },
  { languageCode: "th", supportSource: true, supportTarget: true },
  { languageCode: "ti", supportSource: true, supportTarget: true },
  { languageCode: "tk", supportSource: true, supportTarget: true },
  { languageCode: "tl", supportSource: true, supportTarget: true },
  { languageCode: "tn", supportSource: true, supportTarget: true },
  { languageCode: "tr", supportSource: true, supportTarget: true },
  { languageCode: "ts", supportSource: true, supportTarget: true },
  { languageCode: "tt", supportSource: true, supportTarget: true },
  { languageCode: "ug", supportSource: true, supportTarget: true },
  { languageCode: "uk", supportSource: true, supportTarget: true },
  { languageCode: "ur", supportSource: true, supportTarget: true },
  { languageCode: "uz", supportSource: true, supportTarget: true },
  { languageCode: "vi", supportSource: true, supportTarget: true },
  { languageCode: "xh", supportSource: true, supportTarget: true },
  { languageCode: "yi", supportSource: true, supportTarget: true },
  { languageCode: "yo", supportSource: true, supportTarget: true },
  { languageCode: "yua", supportSource: true, supportTarget: true },
  { languageCode: "yue", supportSource: true, supportTarget: true },
  { languageCode: "zh", supportSource: true, supportTarget: true },
  { languageCode: "zh-CN", supportSource: true, supportTarget: true },
  { languageCode: "zh-TW", supportSource: true, supportTarget: true },
  { languageCode: "zu", supportSource: true, supportTarget: true },
].filter((l) => !l.languageCode.includes("-"));

const translateBangs = [];
for (const { languageCode: from } of languages.filter((l) => l.supportSource)) {
  for (const { languageCode: to } of languages.filter((l) => l.supportTarget)) {
    if (from === to) continue;
    currenciesBangs.push({
      d: "translate.google.com",
      s: "Google Translate",
      t: `${from}2${to}`,
      u: `https://translate.google.com/?sl=${from}&tl=${to}&text={{{s}}}&op=translate`,
    });
  }
}
if (customBangs.length > 0) {
  console.log(`Supporting ${languages.length} languages to translate`);
}

// Format the output file (minified)
const output = `// This file was (mostly) ripped from https://duckduckgo.com/bang.js

export const bangs = ${JSON.stringify(combinedBangs, ["d", "s", "t", "u"], 2)};

export const convertBangs = ${JSON.stringify(currenciesBangs.concat(translateBangs), ["d", "s", "t", "u"], 2)};
`;

// Write the updated bang.js
writeFileSync("public/bang.js", output, "utf8");

console.log(
  `Done! Updated public/bang.js with ${combinedBangs.length} total bangs`,
);
