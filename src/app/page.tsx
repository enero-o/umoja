"use client";
import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";

import AreaChart from "./components/chart";
import { getPrices, getRanges, getSymbols, formatMoney } from "./utils";

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
        .then((res) => {
          setData(res.results);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedOption, interval]);

  return (
    <main className="flex min-h-screen text-black flex-col p-10 bg-white">
      <p className="text-xs">* search stock symbol</p>
      <div className="mb-20 text-center  lg:text-left">
        <AsyncSelect
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          placeholder="Search stock options"
          noOptionsMessage={(val) =>
            val.inputValue && `No data found for ${val.inputValue}`
          }
          styles={{
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "black",
            }),
          }}
        />
      </div>

      <div>
        {data && (
          <div>
            <div>
              <h1 className="text-2xl">{data.meta?.symbol}</h1>
              <h1 className="text-3xl">
                {formatMoney.format(data.meta?.regularMarketPrice)}
              </h1>

              <p className="text-sm">
                {formatMoney.format(data.quotes[0].open - data.quotes[0].close)}{" "}
                Today
              </p>
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
