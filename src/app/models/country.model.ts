export interface Country {
    countryID: number;
    name: string;
    shortCode?: string;
    currencyCode?: string;
}

export function getCountries() {
    return [
        { countryID: 1, name: 'India', shortCode: 'IND', currencyCode: 'INR' },
        { countryID: 1, name: 'Pakistan', shortCode: 'PK', currencyCode: 'INR' },
        { countryID: 1, name: 'China', shortCode: 'CH', currencyCode: 'CNY' },
        { countryID: 1, name: 'Japan', shortCode: 'JP', currencyCode: 'JPY' },
    ]
}