using DataService;
using DataService.Models;
using PlanPoker.Models;
using System;
using System.Linq;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс DeckService.
    /// </summary>
    public class DeckService
    {
        /// <summary>
        /// Экземпляр InMemoryDeckRepository.
        /// </summary>
        private readonly IRepository<Deck> deckRepository;

        /// <summary>
        /// Экземпляр InMemoryCardRepository.
        /// </summary>
        private readonly IRepository<Card> cardRepository;


        /// <summary>
        /// Конструктор класса DeckService.
        /// </summary>
        /// <param name="deckRepository">Экземпляр InMemoryDeckRepository.</param>
        /// <param name="cardRepository">Экземпляр InMemoryCardRepository.</param>
        public DeckService(IRepository<Deck> deckRepository, IRepository<Card> cardRepository)
        {
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
        }

        /// <summary>
        /// Создает новую колоду.
        /// </summary>
        /// <param name="name">Название колоды.</param>
        /// <returns>Возвращает экземпляр Deck.</returns>
        public Deck Create(string name)
        {
            var deck = this.deckRepository.Create();

            if (name is null || name == string.Empty)
            {
                throw new UnauthorizedAccessException("Wrong deck name");
            }

            var cardIDsList = this.cardRepository.GetAll().Select(item => item.Id).ToList();
            foreach (var cardID in cardIDsList)
            {
                deck.CardsIDs.Add(cardID);
            }

            deck.Name = name;
            this.deckRepository.Save(deck);
            return deck;
        }
    }
}
