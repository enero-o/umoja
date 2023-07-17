"use client";
import React from "react";

import { LineChart, Line, ResponsiveContainer } from "recharts";

interface IProps {
  data: any[];
}

export default function Chart(props: IProps) {
  const { data } = props;

  return (
    <div
      style={{
        height: "50vh",
        backgroundColor: "white",
        padding: 10,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={data}>
          <Line
            type="monotone"
            dataKey="close"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
