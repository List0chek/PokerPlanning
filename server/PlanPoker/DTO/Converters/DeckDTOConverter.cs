using DataService;
using DataService.Models;
using PlanPoker.Models;
using System.Linq;

namespace PlanPoker.DTO.Converters
{
    /// <summary>
    /// Класс DeckDTOConverter.
    /// </summary>
    public class DeckDTOConverter
    {
        /// <summary>
        /// Экземпляр InMemoryCardRepository.
        /// </summary>
        private readonly IRepository<Card> cardRepository;

        /// <summary>
        /// Конструктор класса DeckDTOConverter.
        /// </summary>
        /// <param name="cardRepository">Экземпляр InMemoryCardRepository.</param>
        public DeckDTOConverter(IRepository<Card> cardRepository)
        {
            this.cardRepository = cardRepository;
        }

        /// <summary>
        /// Метод конвертации Deck в DeckDTO.
        /// </summary>
        /// <param name="deck">Экземпляр Deck.</param>
        /// <returns>Экземпляр DeckDTO.</returns>
        public DeckDTO Convert(Deck deck)
        {
            var cardsList = this.cardRepository?.GetAll().Select(item => new CardDTOConverter().Convert(item)).ToList<CardDTO>();
            return new DeckDTO()
            {
                Id = deck.Id,
                Name = deck.Name,

                // CardsIDs = deck.CardsIDs, // В ДТО можно не выводить, т.к. cardsList выводит CardDTO, в которых уже есть cardID.
                Cards = cardsList
            };
        }
    }
}
