// Stock model
export type StockComment = {
  id: number;
  title: string;
  content: string;
  createdBy: string;
  createdOn: string;
  stockId: number;
};

export type Stock = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
  comments: StockComment[];
};

export type Portfolio = {
  id: number;
  symbol: string;
  companyName: string;
  purchase: number;
  lastDiv: number;
  industry: string;
  marketCap: number;
};

// Quote from Twelve Data
export type StockQuote = {
  symbol: string;
  name: string;
  exchange: string;
  open: number;
  high: number;
  low: number;
  close: number;
  previousClose: number;
  change: number;
  percentChange: string;
  volume: number;
  datetime: string;
};

// Auth models
export type UserProfile = {
  userName: string;
  email: string;
  token: string;
};

export type RegisterFormInputs = {
  email: string;
  userName: string;
  password: string;
};

export type LoginFormInputs = {
  userName: string;
  password: string;
};

// Comment models
export type CommentFormInputs = {
  title: string;
  content: string;
};
