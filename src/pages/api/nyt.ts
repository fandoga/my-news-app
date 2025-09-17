import { Article, NytDoc } from "@/store/newsSlice";
import type { NextApiRequest, NextApiResponse } from "next";

let cache: Article[] = [];
let lastFetch = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = Date.now();
  if (now - lastFetch < 30000 && cache.length > 0) {
    console.log("LOADED FROM CACHE");
    return res.status(200).json(cache);
  }
  
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() - 3;

    const response = await fetch(
      `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${process.env.NYT_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "NYT fetch failed" });
    }
    const data = await response.json();
    
    // Подготовим данные сразу в удобном виде
    const news = data.response.docs.map((item: NytDoc) => ({
      multimedia: item.multimedia ?? [],
      source: item.source,
      title: item.headline?.main || "No title",
      url: item.web_url,
      published_date: item.pub_date,
      abstract: item.abstract || "",
    }));

    cache = news;
    lastFetch = now;

    res.status(200).json(cache);
  } catch (e) {
    console.error("Proxy error:", e);
    res.status(500).json({ error: "Proxy failed" });
  }
}