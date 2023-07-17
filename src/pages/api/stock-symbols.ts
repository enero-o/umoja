import { NextApiResponse, NextApiRequest } from "next";
import yahooFinance from "yahoo-finance2";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const query = req.query;
    const symbol = query.symbol as string;

    if (!symbol) {
      return res
        .status(500)
        .json({ status: "error", message: "invalid symbol" });
    }

    const results = await yahooFinance.search(symbol, {
      enableFuzzyQuery: true,
    });

    const json_response = {
      status: "success",
      results: results.quotes,
    };

    return res.json(json_response);
  } catch (ex: any) {
    res.status(500).json({ status: "error", message: ex.message });
  }
}
