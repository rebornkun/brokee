export type TCountry = { value?: string; label?: string; iso?: string };
export type TBankCountry = {
  value: string;
  label: string;
  iso: string;
  currency: string;
};
export type TCountries = TCountry[];
export const countriesObj: TCountries = [
  {
    value: "Afghanistan",
    label: "Afghanistan",
    iso: "AF",
  },
  {
    value: "Albania",
    label: "Albania",
    iso: "AL",
  },
  {
    value: "Algeria",
    label: "Algeria",
    iso: "DZ",
  },
  {
    value: "Andorra",
    label: "Andorra",
    iso: "AD",
  },
  {
    value: "Angola",
    label: "Angola",
    iso: "AO",
  },
  {
    value: "Antigua and Barbuda",
    label: "Antigua and Barbuda",
    iso: "AG",
  },
  {
    value: "Argentina",
    label: "Argentina",
    iso: "AR",
  },
  {
    value: "Armenia",
    label: "Armenia",
    iso: "AM",
  },
  {
    value: "Australia",
    label: "Australia",
    iso: "AU",
  },
  {
    value: "Austria",
    label: "Austria",
    iso: "AT",
  },
  {
    value: "Azerbaijan",
    label: "Azerbaijan",
    iso: "AZ",
  },
  {
    value: "Bahamas",
    label: "Bahamas",
    iso: "BS",
  },
  {
    value: "Bahrain",
    label: "Bahrain",
    iso: "BH",
  },
  {
    value: "Bangladesh",
    label: "Bangladesh",
    iso: "BD",
  },
  {
    value: "Barbados",
    label: "Barbados",
    iso: "BB",
  },
  {
    value: "Belarus",
    label: "Belarus",
    iso: "BY",
  },
  {
    value: "Belgium",
    label: "Belgium",
    iso: "BE",
  },
  {
    value: "Belize",
    label: "Belize",
    iso: "BZ",
  },
  {
    value: "Benin",
    label: "Benin",
    iso: "BJ",
  },
  {
    value: "Bhutan",
    label: "Bhutan",
    iso: "BT",
  },
  {
    value: "Bolivia",
    label: "Bolivia",
    iso: "BO",
  },
  {
    value: "Bosnia and Herzegovina",
    label: "Bosnia and Herzegovina",
    iso: "BA",
  },
  {
    value: "Botswana",
    label: "Botswana",
    iso: "BW",
  },
  {
    value: "Brazil",
    label: "Brazil",
    iso: "BR",
  },
  {
    value: "Brunei",
    label: "Brunei",
    iso: "BN",
  },
  {
    value: "Bulgaria",
    label: "Bulgaria",
    iso: "BG",
  },
  {
    value: "Burkina Faso",
    label: "Burkina Faso",
    iso: "BF",
  },
  {
    value: "Burma",
    label: "Burma",
    iso: "MM",
  },
  {
    value: "Burundi",
    label: "Burundi",
    iso: "BI",
  },
  {
    value: "Cambodia",
    label: "Cambodia",
    iso: "KH",
  },
  {
    value: "Cameroon",
    label: "Cameroon",
    iso: "CM",
  },
  {
    value: "Canada",
    label: "Canada",
    iso: "CA",
  },
  {
    value: "Cape Verde",
    label: "Cape Verde",
    iso: "CV",
  },
  {
    value: "Central African Republic",
    label: "Central African Republic",
    iso: "CF",
  },
  {
    value: "Chad",
    label: "Chad",
    iso: "TD",
  },
  {
    value: "Chile",
    label: "Chile",
    iso: "CL",
  },
  {
    value: "China",
    label: "China",
    iso: "CN",
  },
  {
    value: "Colombia",
    label: "Colombia",
    iso: "CO",
  },
  {
    value: "Comoros",
    label: "Comoros",
    iso: "KM",
  },
  {
    value: "Congo (Brazzaville)",
    label: "Congo (Brazzaville)",
    iso: "CG",
  },
  {
    value: "Congo (Kinshasa)",
    label: "Congo (Kinshasa)",
    iso: "CD",
  },
  {
    value: "Costa Rica",
    label: "Costa Rica",
    iso: "CR",
  },
  {
    value: "Côte d`Ivoire",
    label: "Côte d`Ivoire",
    iso: "CI",
  },
  {
    value: "Croatia",
    label: "Croatia",
    iso: "HR",
  },
  {
    value: "Cuba",
    label: "Cuba",
    iso: "CU",
  },
  {
    value: "Cyprus",
    label: "Cyprus",
    iso: "CY",
  },
  {
    value: "Czech Republic",
    label: "Czech Republic",
    iso: "CZ",
  },
  {
    value: "Denmark",
    label: "Denmark",
    iso: "DK",
  },
  {
    value: "Djibouti",
    label: "Djibouti",
    iso: "DJ",
  },
  {
    value: "Dominica",
    label: "Dominica",
    iso: "DM",
  },
  {
    value: "Dominican Republic",
    label: "Dominican Republic",
    iso: "DO",
  },
  {
    value: "Ecuador",
    label: "Ecuador",
    iso: "EC",
  },
  {
    value: "Egypt",
    label: "Egypt",
    iso: "EG",
  },
  {
    value: "El Salvador",
    label: "El Salvador",
    iso: "SV",
  },
  {
    value: "Equatorial Guinea",
    label: "Equatorial Guinea",
    iso: "GQ",
  },
  {
    value: "Eritrea",
    label: "Eritrea",
    iso: "ER",
  },
  {
    value: "Estonia",
    label: "Estonia",
    iso: "EE",
  },
  {
    value: "Ethiopia",
    label: "Ethiopia",
    iso: "ET",
  },
  {
    value: "Fiji",
    label: "Fiji",
    iso: "FJ",
  },
  {
    value: "Finland",
    label: "Finland",
    iso: "FI",
  },
  {
    value: "France",
    label: "France",
    iso: "FR",
  },
  {
    value: "French Polynesia",
    label: "French Polynesia",
    iso: "PF",
  },
  {
    value: "Gabon",
    label: "Gabon",
    iso: "GA",
  },
  {
    value: "Gambia",
    label: "Gambia",
    iso: "GM",
  },
  {
    value: "Georgia",
    label: "Georgia",
    iso: "GE",
  },
  {
    value: "Germany",
    label: "Germany",
    iso: "DE",
  },
  {
    value: "Ghana",
    label: "Ghana",
    iso: "GH",
  },
  {
    value: "Gibraltar",
    label: "Gibraltar",
    iso: "GI",
  },
  {
    value: "Greenland",
    label: "Greenland",
    iso: "GL",
  },
  {
    value: "Greece",
    label: "Greece",
    iso: "GR",
  },
  {
    value: "Grenada",
    label: "Grenada",
    iso: "GD",
  },
  {
    value: "Guatemala",
    label: "Guatemala",
    iso: "GT",
  },
  {
    value: "Guinea",
    label: "Guinea",
    iso: "GN",
  },
  {
    value: "Guinea-Bissau",
    label: "Guinea-Bissau",
    iso: "GW",
  },
  {
    value: "Guyana",
    label: "Guyana",
    iso: "GY",
  },
  {
    value: "Haiti",
    label: "Haiti",
    iso: "HT",
  },
  {
    value: "Hong Kong SAR China",
    label: "Hong Kong SAR China",
    iso: "HK",
  },
  {
    value: "Vatican City",
    label: "Vatican City",
    iso: "VA",
  },
  {
    value: "Honduras",
    label: "Honduras",
    iso: "HN",
  },
  {
    value: "Hungary",
    label: "Hungary",
    iso: "HU",
  },
  {
    value: "Iceland",
    label: "Iceland",
    iso: "IS",
  },
  {
    value: "India",
    label: "India",
    iso: "IN",
  },
  {
    value: "Indonesia",
    label: "Indonesia",
    iso: "ID",
  },
  {
    value: "Iran",
    label: "Iran",
    iso: "IR",
  },
  {
    value: "Iraq",
    label: "Iraq",
    iso: "IQ",
  },
  {
    value: "Ireland",
    label: "Ireland",
    iso: "IE",
  },
  {
    value: "Israel",
    label: "Israel",
    iso: "IL",
  },
  {
    value: "Italy",
    label: "Italy",
    iso: "IT",
  },
  {
    value: "Jamaica",
    label: "Jamaica",
    iso: "JM",
  },
  {
    value: "Japan",
    label: "Japan",
    iso: "JP",
  },
  {
    value: "Jordan",
    label: "Jordan",
    iso: "JO",
  },
  {
    value: "Kazakhstan",
    label: "Kazakhstan",
    iso: "KZ",
  },
  {
    value: "Kenya",
    label: "Kenya",
    iso: "KE",
  },
  {
    value: "Kiribati",
    label: "Kiribati",
    iso: "KI",
  },
  {
    value: "Korea (North)",
    label: "Korea (North)",
    iso: "KP",
  },
  {
    value: "Korea (South)",
    label: "Korea (South)",
    iso: "KR",
  },
  {
    value: "Kuwait",
    label: "Kuwait",
    iso: "KW",
  },
  {
    value: "Kyrgyzstan",
    label: "Kyrgyzstan",
    iso: "KG",
  },
  {
    value: "Laos",
    label: "Laos",
    iso: "LA",
  },
  {
    value: "Latvia",
    label: "Latvia",
    iso: "LV",
  },
  {
    value: "Lebanon",
    label: "Lebanon",
    iso: "LB",
  },
  {
    value: "Lesotho",
    label: "Lesotho",
    iso: "LS",
  },
  {
    value: "Liberia",
    label: "Liberia",
    iso: "LR",
  },
  {
    value: "Libya",
    label: "Libya",
    iso: "LY",
  },
  {
    value: "Liechtenstein",
    label: "Liechtenstein",
    iso: "LI",
  },
  {
    value: "Lithuania",
    label: "Lithuania",
    iso: "LT",
  },
  {
    value: "Luxembourg",
    label: "Luxembourg",
    iso: "LU",
  },
  {
    value: "North Macedonia",
    label: "North Macedonia",
    iso: "MK",
  },
  {
    value: "Madagascar",
    label: "Madagascar",
    iso: "MG",
  },
  {
    value: "Malawi",
    label: "Malawi",
    iso: "MW",
  },
  {
    value: "Malaysia",
    label: "Malaysia",
    iso: "MY",
  },
  {
    value: "Maldives",
    label: "Maldives",
    iso: "MV",
  },
  {
    value: "Mali",
    label: "Mali",
    iso: "ML",
  },
  {
    value: "Malta",
    label: "Malta",
    iso: "MT",
  },
  {
    value: "Marshall Islands",
    label: "Marshall Islands",
    iso: "MH",
  },
  {
    value: "Martinique",
    label: "Martinique",
    iso: "MQ",
  },
  {
    value: "Mauritania",
    label: "Mauritania",
    iso: "MR",
  },
  {
    value: "Mauritius",
    label: "Mauritius",
    iso: "MU",
  },
  {
    value: "Mexico",
    label: "Mexico",
    iso: "MX",
  },
  {
    value: "Micronesia",
    label: "Micronesia",
    iso: "FM",
  },
  {
    value: "Moldova",
    label: "Moldova",
    iso: "MD",
  },
  {
    value: "Monaco",
    label: "Monaco",
    iso: "MC",
  },
  {
    value: "Mongolia",
    label: "Mongolia",
    iso: "MN",
  },
  {
    value: "Montenegro",
    label: "Montenegro",
    iso: "ME",
  },
  {
    value: "Morocco",
    label: "Morocco",
    iso: "MA",
  },
  {
    value: "Mozambique",
    label: "Mozambique",
    iso: "MZ",
  },
  {
    value: "Namibia",
    label: "Namibia",
    iso: "NA",
  },
  {
    value: "Nauru",
    label: "Nauru",
    iso: "NR",
  },
  {
    value: "Nepal",
    label: "Nepal",
    iso: "NP",
  },
  {
    value: "Netherlands",
    label: "Netherlands",
    iso: "NL",
  },
  {
    value: "New Zealand",
    label: "New Zealand",
    iso: "NZ",
  },
  {
    value: "Nicaragua",
    label: "Nicaragua",
    iso: "NI",
  },
  {
    value: "Niger",
    label: "Niger",
    iso: "NE",
  },
  {
    value: "Nigeria",
    label: "Nigeria",
    iso: "NG",
  },
  {
    value: "Norway",
    label: "Norway",
    iso: "NO",
  },
  {
    value: "Oman",
    label: "Oman",
    iso: "OM",
  },
  {
    value: "Pakistan",
    label: "Pakistan",
    iso: "PK",
  },
  {
    value: "Palau",
    label: "Palau",
    iso: "PW",
  },
  {
    value: "Panama",
    label: "Panama",
    iso: "PA",
  },
  {
    value: "Papua New Guinea",
    label: "Papua New Guinea",
    iso: "PG",
  },
  {
    value: "Paraguay",
    label: "Paraguay",
    iso: "PY",
  },
  {
    value: "Peru",
    label: "Peru",
    iso: "PE",
  },
  {
    value: "Philippines",
    label: "Philippines",
    iso: "PH",
  },
  {
    value: "Poland",
    label: "Poland",
    iso: "PL",
  },
  {
    value: "Portugal",
    label: "Portugal",
    iso: "PT",
  },
  {
    value: "Puerto Rico",
    label: "Puerto Rico",
    iso: "PR",
  },
  {
    value: "Qatar",
    label: "Qatar",
    iso: "QA",
  },
  {
    value: "Romania",
    label: "Romania",
    iso: "RO",
  },
  {
    value: "Russia",
    label: "Russia",
    iso: "RU",
  },
  {
    value: "Rwanda",
    label: "Rwanda",
    iso: "RW",
  },
  {
    value: "Saint Kitts and Nevis",
    label: "Saint Kitts and Nevis",
    iso: "KN",
  },
  {
    value: "Sahrawi Arab Democratic Republic",
    label: "Sahrawi Arab Democratic Republic",
    iso: "EH",
  },
  {
    value: "Saint Lucia",
    label: "Saint Lucia",
    iso: "LC",
  },
  {
    value: "Saint Vincent",
    label: "Saint Vincent",
    iso: "VC",
  },
  {
    value: "Samoa",
    label: "Samoa",
    iso: "WS",
  },
  {
    value: "San Marino",
    label: "San Marino",
    iso: "SM",
  },
  {
    value: "Sao Tome and Principe",
    label: "Sao Tome and Principe",
    iso: "ST",
  },
  {
    value: "Saudi Arabia",
    label: "Saudi Arabia",
    iso: "SA",
  },
  {
    value: "Senegal",
    label: "Senegal",
    iso: "SN",
  },
  {
    value: "Serbia",
    label: "Serbia",
    iso: "RS",
  },
  {
    value: "Seychelles",
    label: "Seychelles",
    iso: "SC",
  },
  {
    value: "Sierra Leone",
    label: "Sierra Leone",
    iso: "SL",
  },
  {
    value: "Singapore",
    label: "Singapore",
    iso: "SG",
  },
  {
    value: "Slovakia",
    label: "Slovakia",
    iso: "SK",
  },
  {
    value: "Slovenia",
    label: "Slovenia",
    iso: "SI",
  },
  {
    value: "Solomon Islands",
    label: "Solomon Islands",
    iso: "SB",
  },
  {
    value: "Somalia",
    label: "Somalia",
    iso: "SO",
  },
  {
    value: "South Africa",
    label: "South Africa",
    iso: "ZA",
  },
  {
    value: "Spain",
    label: "Spain",
    iso: "ES",
  },
  {
    value: "Sri Lanka",
    label: "Sri Lanka",
    iso: "LK",
  },
  {
    value: "Sudan",
    label: "Sudan",
    iso: "SD",
  },
  {
    value: "Suriname",
    label: "Suriname",
    iso: "SR",
  },
  {
    value: "Swaziland",
    label: "Swaziland",
    iso: "SZ",
  },
  {
    value: "Sweden",
    label: "Sweden",
    iso: "SE",
  },
  {
    value: "Switzerland",
    label: "Switzerland",
    iso: "CH",
  },
  {
    value: "Syria",
    label: "Syria",
    iso: "SY",
  },
  {
    value: "Tajikistan",
    label: "Tajikistan",
    iso: "TJ",
  },
  {
    value: "Tanzania",
    label: "Tanzania",
    iso: "TZ",
  },
  {
    value: "Thailand",
    label: "Thailand",
    iso: "TH",
  },
  {
    value: "Togo",
    label: "Togo",
    iso: "TG",
  },
  {
    value: "Tonga",
    label: "Tonga",
    iso: "TO",
  },
  {
    value: "Trinidad and Tobago",
    label: "Trinidad and Tobago",
    iso: "TT",
  },
  {
    value: "Tunisia",
    label: "Tunisia",
    iso: "TN",
  },
  {
    value: "Turkey",
    label: "Turkey",
    iso: "TR",
  },
  {
    value: "Turkmenistan",
    label: "Turkmenistan",
    iso: "TM",
  },
  {
    value: "Tuvalu",
    label: "Tuvalu",
    iso: "TV",
  },
  {
    value: "Uganda",
    label: "Uganda",
    iso: "UG",
  },
  {
    value: "Ukraine",
    label: "Ukraine",
    iso: "UA",
  },
  {
    value: "United Arab Emirates",
    label: "United Arab Emirates",
    iso: "AE",
  },
  {
    value: "United Kingdom",
    label: "United Kingdom",
    iso: "GB",
  },
  {
    value: "United States",
    label: "United States",
    iso: "US",
  },
  {
    value: "Uruguay",
    label: "Uruguay",
    iso: "UY",
  },
  {
    value: "Uzbekistan",
    label: "Uzbekistan",
    iso: "UZ",
  },
  {
    value: "Vanuatu",
    label: "Vanuatu",
    iso: "VU",
  },
  {
    value: "Venezuela",
    label: "Venezuela",
    iso: "VE",
  },
  {
    value: "Vietnam",
    label: "Vietnam",
    iso: "VN",
  },
  {
    value: "Yemen",
    label: "Yemen",
    iso: "YE",
  },
  {
    value: "Zambia",
    label: "Zambia",
    iso: "ZM",
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe",
    iso: "ZW",
  },
  {
    value: "Kosovo",
    label: "Kosovo",
    iso: "XK",
  },
  {
    value: "Taiwan",
    label: "Taiwan",
    iso: "TW",
  },
  {
    value: "New Caledonia",
    label: "New Caledonia",
    iso: "NC",
  },
  {
    value: "Palestine",
    label: "Palestine",
    iso: "PS",
  },
  {
    value: "European Union",
    label: "European Union",
    iso: "EU",
  },
  {
    value: "United Nations",
    label: "United Nations",
    iso: "UN",
  },
];
