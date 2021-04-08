using DataService;
using DataService.Models;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
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
        /// Конструктор класса DeckService.
        /// </summary>
        /// <param name="deckRepository">Экземпляр InMemoryDeckRepository.</param>
        public DeckService(IRepository<Deck> deckRepository)
        {
            this.deckRepository = deckRepository;
        }

        /// <summary>
        /// Создает новую колоду.
        /// </summary>
        /// <param name="name">Название колоды.</param>
        /// <param name="cardIds">Id карт.</param>
        /// <returns>Возвращает экземпляр Deck.</returns>
        public Deck Create(string name, IEnumerable<Guid> cardIds)
        {
            var deck = this.deckRepository.Create();
            if (this.deckRepository.GetAll().Select(item => item.Name).Equals(name))
            {
                throw new ArgumentException("Wrong deck name");
            }

            if (name is null || name == string.Empty)
            {
                throw new ArgumentException("Wrong deck name");
            }

            var cardIDsList = cardIds ?? throw new ArgumentException("Wrong cardIds");
            foreach (var cardID in cardIDsList)
            {
                deck.CardsIds.Add(cardID);
            }

            deck.Name = name;
            this.deckRepository.Save(deck);
            return deck;
        }

        /// <summary>
        /// Создает новую колоду.
        /// </summary>
        /// <returns>Возвращает экземпляр Deck.</returns>
        public Deck GetDefaultDeck()
        {
            var deck = this.deckRepository
                .GetAll()
                .Where(item => item.Name.Contains("defaultDeck"))
                .FirstOrDefault();
            return deck;
        }
    }
}
