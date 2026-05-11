using api.Interfaces;
using api.Models;
using api.Mappers;
using Newtonsoft.Json;

namespace api.Service
{
    public class TwelveDataService : ITwelveDataService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly string _baseUrl = "https://api.twelvedata.com";

        public TwelveDataService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }

        private string ApiKey => _config["TwelveData:ApiKey"] ?? throw new Exception("TwelveData API Key not configured");

        public async Task<Stock?> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var url = $"{_baseUrl}/quote?symbol={symbol}&apikey={ApiKey}";
                var result = await _httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode) return null;

                var content = await result.Content.ReadAsStringAsync();
                var quote = JsonConvert.DeserializeObject<TwelveDataQuoteRaw>(content);

                if (quote == null || quote.Status == "error") return null;

                return new Stock
                {
                    Symbol = quote.Symbol ?? symbol,
                    CompanyName = quote.Name ?? string.Empty,
                    Industry = quote.Exchange ?? string.Empty,
                    Purchase = quote.Close ?? 0,
                    LastDiv = 0,
                    MarketCap = 0
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"TwelveData error: {ex.Message}");
                return null;
            }
        }

        public async Task<TwelveDataQuote?> GetQuoteAsync(string symbol)
        {
            try
            {
                var url = $"{_baseUrl}/quote?symbol={symbol}&apikey={ApiKey}";
                var result = await _httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode) return null;

                var content = await result.Content.ReadAsStringAsync();
                var raw = JsonConvert.DeserializeObject<TwelveDataQuoteRaw>(content);

                if (raw == null || raw.Status == "error") return null;

                return new TwelveDataQuote
                {
                    Symbol = raw.Symbol ?? string.Empty,
                    Name = raw.Name ?? string.Empty,
                    Exchange = raw.Exchange ?? string.Empty,
                    Open = raw.Open ?? 0,
                    High = raw.High ?? 0,
                    Low = raw.Low ?? 0,
                    Close = raw.Close ?? 0,
                    PreviousClose = raw.PreviousClose ?? 0,
                    Change = raw.Change ?? 0,
                    PercentChange = raw.PercentChange ?? "0",
                    Volume = raw.Volume ?? 0,
                    Datetime = raw.Datetime ?? string.Empty
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"TwelveData error: {ex.Message}");
                return null;
            }
        }

        public async Task<List<TwelveDataSearchResult>?> SearchStocksAsync(string query)
        {
            try
            {
                var url = $"{_baseUrl}/symbol_search?symbol={query}&apikey={ApiKey}";
                var result = await _httpClient.GetAsync(url);

                if (!result.IsSuccessStatusCode) return null;

                var content = await result.Content.ReadAsStringAsync();
                var searchResponse = JsonConvert.DeserializeObject<TwelveDataSearchResponse>(content);

                return searchResponse?.Data?.Select(d => new TwelveDataSearchResult
                {
                    Symbol = d.Symbol ?? string.Empty,
                    InstrumentName = d.InstrumentName ?? string.Empty,
                    Exchange = d.Exchange ?? string.Empty,
                    MicCode = d.MicCode ?? string.Empty,
                    ExchangeTimezone = d.ExchangeTimezone ?? string.Empty,
                    InstrumentType = d.InstrumentType ?? string.Empty,
                    Country = d.Country ?? string.Empty,
                    Currency = d.Currency ?? string.Empty
                }).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"TwelveData search error: {ex.Message}");
                return null;
            }
        }
    }

    // Raw JSON mapping classes for Twelve Data API
    internal class TwelveDataQuoteRaw
    {
        [JsonProperty("symbol")] public string? Symbol { get; set; }
        [JsonProperty("name")] public string? Name { get; set; }
        [JsonProperty("exchange")] public string? Exchange { get; set; }
        [JsonProperty("open")] public decimal? Open { get; set; }
        [JsonProperty("high")] public decimal? High { get; set; }
        [JsonProperty("low")] public decimal? Low { get; set; }
        [JsonProperty("close")] public decimal? Close { get; set; }
        [JsonProperty("previous_close")] public decimal? PreviousClose { get; set; }
        [JsonProperty("change")] public decimal? Change { get; set; }
        [JsonProperty("percent_change")] public string? PercentChange { get; set; }
        [JsonProperty("volume")] public long? Volume { get; set; }
        [JsonProperty("datetime")] public string? Datetime { get; set; }
        [JsonProperty("status")] public string? Status { get; set; }
    }

    internal class TwelveDataSearchResponse
    {
        [JsonProperty("data")] public List<TwelveDataSearchItem>? Data { get; set; }
        [JsonProperty("status")] public string? Status { get; set; }
    }

    internal class TwelveDataSearchItem
    {
        [JsonProperty("symbol")] public string? Symbol { get; set; }
        [JsonProperty("instrument_name")] public string? InstrumentName { get; set; }
        [JsonProperty("exchange")] public string? Exchange { get; set; }
        [JsonProperty("mic_code")] public string? MicCode { get; set; }
        [JsonProperty("exchange_timezone")] public string? ExchangeTimezone { get; set; }
        [JsonProperty("instrument_type")] public string? InstrumentType { get; set; }
        [JsonProperty("country")] public string? Country { get; set; }
        [JsonProperty("currency")] public string? Currency { get; set; }
    }
}
