using DataService;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
using PlanPoker.Services;

namespace PlanPoker.Controllers
{
    /// <summary>
    /// Контроллер колоды.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DeckController : ControllerBase
    {
        /// <summary>
        /// Экземпляр InMemoryCardRepository.
        /// </summary>
        private IRepository<Card> cardRepository;

        /// <summary>
        /// Экземпляр DeckService.
        /// </summary>
        private readonly DeckService deckService;

        /// <summary>
        /// Конструктор класса DeckController.
        /// </summary>
        /// <param name="deckService">Экземпляр DeckService.</param>
        /// <param name="cardRepository">Экземпляр InMemoryCardRepository.</param>
        public DeckController(DeckService deckService, IRepository<Card> cardRepository)
        {
            this.deckService = deckService;
            this.cardRepository = cardRepository;
        }

        /// <summary>
        /// Создает экземпляр Deck.
        /// </summary>
        /// <param name="name">Имя колоды.</param>
        /// <returns>Возвращает DeckDTO.</returns>
        [HttpPost]
        public DeckDTO Create(string name)
        {
            var deck = this.deckService.Create(name);
            return new DeckDTOConverter(this.cardRepository).Convert(deck);
        }
    }
}
