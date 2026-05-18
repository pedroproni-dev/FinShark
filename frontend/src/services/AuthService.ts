import axios from "axios";
import { StockQuote, Portfolio, Stock, StockComment } from "../models";

const api = "http://localhost:5183/api";

// ── Auth ──────────────────────────────────────────────
export const loginAPI = async (username: string, password: string) => {
  return await axios.post(`${api}/account/login`, { username, password });
};

export const registerAPI = async (email: string, username: string, password: string) => {
  return await axios.post(`${api}/account/register`, { email, username, password });
};

// ── Stocks ────────────────────────────────────────────
export const searchStocksAPI = async (query: string): Promise<Stock[] | null> => {
  try {
    const res = await axios.get<Stock[]>(`${api}/stock?symbol=${query}`);
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getStockByIdAPI = async (id: number): Promise<Stock | null> => {
  try {
    const res = await axios.get<Stock>(`${api}/stock/${id}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

// ── Quotes (Twelve Data) ──────────────────────────────
export const getStockQuoteAPI = async (symbol: string): Promise<StockQuote | null> => {
  try {
    const res = await axios.get<StockQuote>(`${api}/quote/${symbol}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const searchQuoteAPI = async (query: string) => {
  try {
    const res = await axios.get(`${api}/quote/search?query=${query}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

// ── Portfolio ─────────────────────────────────────────
export const getUserPortfolioAPI = async (): Promise<Portfolio[] | null> => {
  try {
    const res = await axios.get<Portfolio[]>(`${api}/portfolio`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const addStockToPortfolioAPI = async (symbol: string) => {
  try {
    const res = await axios.post(`${api}/portfolio?symbol=${symbol}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const removeStockFromPortfolioAPI = async (symbol: string) => {
  try {
    const res = await axios.delete(`${api}/portfolio?symbol=${symbol}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

// ── Comments ──────────────────────────────────────────
export const getCommentsAPI = async (stockId: number): Promise<StockComment[] | null> => {
  try {
    const res = await axios.get<StockComment[]>(`${api}/comment?stockId=${stockId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export const createCommentAPI = async (stockId: number, title: string, content: string) => {
  try {
    const res = await axios.post(`${api}/comment/${stockId}`, { title, content });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const deleteCommentAPI = async (commentId: number) => {
  try {
    const res = await axios.delete(`${api}/comment/${commentId}`);
    return res.data;
  } catch (e) {
    return null;
  }
};
