export function getRanges(ranges) {
  const validRanges = [
    "1m",
    "2m",
    "5m",
    "15m",
    "30m",
    "60m",
    "90m",
    "1h",
    "1d",
    "5d",
    "1wk",
    "1mo",
    "3mo",
  ];

  const filteredArray = validRanges.filter((value) => ranges.includes(value));

  return filteredArray;
}

export function getSymbols(symbol: string) {
  const url = `/api/stock-symbols?symbol=${symbol}`;

  return fetch(url)
    .then((i) => i.json())
    .then((res) =>
      res.results
        .filter((i: any) => i.isYahooFinance)
        .map((i: any) => ({
          label: `${i.symbol}, ${i.shortname}`,
          value: i.symbol,
        }))
    )
    .catch((err) => console.log(err));
}

export function getPrices(symbol: string, interval: string) {
  const url = `/api/stock-prices?symbol=${symbol}&interval=${interval}`;

  return fetch(url)
    .then((i) => i.json())
    .then((res) => res)
    .catch((err) => console.log(err));
}

export const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
