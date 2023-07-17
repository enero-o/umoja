import { NextApiResponse, NextApiRequest } from "next";
import yahooFinance from "yahoo-finance2";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = req.query;
    const symbol = query.symbol as string;
    const interval = query.interval as string;

    if (!symbol) {
      return res
        .status(500)
        .json({ status: "error", message: "invalid symbol" });
    }

    const queryOptions = { period1: "2021-05-08", interval } as any;
    const result = await yahooFinance._chart(symbol, queryOptions);

    const json_response = {
      status: "success",
      results: result,
    };

    return res.json(json_response);
  } catch (ex: any) {
    res.status(500).json({ status: "error", message: ex.message });
  }
}
