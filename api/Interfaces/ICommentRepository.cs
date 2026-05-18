using api.Dtos.Comment;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync();
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> UpdateAsync(int id, UpdateCommentRequestDto commentDto);
        Task<Comment?> DeleteAsync(int id);
    }

    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetUserPortfolio(AppUser user);
        Task<Portfolio> CreateAsync(Portfolio portfolio);
        Task<Portfolio> DeletePortfolioAsync(AppUser appUser, string symbol);
    }

    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }

    public interface ITwelveDataService
    {
        Task<Stock?> FindStockBySymbolAsync(string symbol);
        Task<TwelveDataQuote?> GetQuoteAsync(string symbol);
        Task<List<TwelveDataSearchResult>?> SearchStocksAsync(string query);
    }

    public class TwelveDataQuote
    {
        public string Symbol { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Exchange { get; set; } = string.Empty;
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
        public decimal PreviousClose { get; set; }
        public decimal Change { get; set; }
        public string PercentChange { get; set; } = string.Empty;
        public long Volume { get; set; }
        public string Datetime { get; set; } = string.Empty;
    }

    public class TwelveDataSearchResult
    {
        public string Symbol { get; set; } = string.Empty;
        public string InstrumentName { get; set; } = string.Empty;
        public string Exchange { get; set; } = string.Empty;
        public string MicCode { get; set; } = string.Empty;
        public string ExchangeTimezone { get; set; } = string.Empty;
        public string InstrumentType { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
    }
}
