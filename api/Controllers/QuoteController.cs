using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/quote")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly ITwelveDataService _twelveDataService;

        public QuoteController(ITwelveDataService twelveDataService)
        {
            _twelveDataService = twelveDataService;
        }

        [HttpGet("{symbol}")]
        [Authorize]
        public async Task<IActionResult> GetQuote([FromRoute] string symbol)
        {
            if (string.IsNullOrWhiteSpace(symbol))
                return BadRequest("Symbol is required");

            var quote = await _twelveDataService.GetQuoteAsync(symbol.ToUpper());
            if (quote == null) return NotFound($"Quote for {symbol} not found");

            return Ok(quote);
        }

        [HttpGet("search")]
        [Authorize]
        public async Task<IActionResult> SearchStocks([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Search query is required");

            var results = await _twelveDataService.SearchStocksAsync(query);
            if (results == null || !results.Any())
                return NotFound("No stocks found");

            return Ok(results);
        }
    }
}
