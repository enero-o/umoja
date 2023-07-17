"use client";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import AreaChart from "./components/chart";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [data, setData] = useState<any>("");
  const [interval, setInterval] = useState<string>("1d");

  const promiseOptions = (inputValue: string) => {
    return new Promise<[]>((resolve) => {
      setTimeout(() => {
        if (inputValue && inputValue.length > 2) {
          resolve(getSymbols(inputValue));
        } else {
          resolve([]);
        }
      }, 1000);
    });
  };

  useEffect(() => {
    if (selectedOption.value) {
      getPrices(selectedOption.value, interval)
        .then((res) => setData(res.results))
        .catch((err) => console.log(err));
    }
  }, [selectedOption, interval]);

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="mb-20 text-center  lg:text-left">
        <AsyncSelect
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          placeholder="Search stock options"
          noOptionsMessage={(val) => `No data found for ${val.inputValue}`}
        />
      </div>

      <div>
        {data && (
          <div>
            <div>
              <h1 className="text-2xl">{data.meta?.symbol}</h1>
              <h1 className="text-3xl">${data.meta?.regularMarketPrice}</h1>
            </div>

            <div className="mt-10">
              <AreaChart data={data.quotes} />
            </div>

            <div className="max-w-md mt-10">
              <div className="flex bg-white">
                <ul className="flex">
                  {getRanges(data.meta.validRanges).map((i) => (
                    <li className="" key={i}>
                      <button
                        className={`mx-1 py-2 px-2 focus:outline-none ${
                          interval == i ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setInterval(i)}
                      >
                        {i}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function getRanges(ranges) {
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

function getSymbols(symbol: string) {
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

function getPrices(symbol: string, interval: string) {
  const url = `/api/stock-prices?symbol=${symbol}&interval=${interval}`;

  return fetch(url)
    .then((i) => i.json())
    .then((res) => res)
    .catch((err) => console.log(err));
}
