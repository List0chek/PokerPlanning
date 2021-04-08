using DataService;
using DataService.Models;
using System;

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
        /// <returns>Возвращает экземпляр Deck.</returns>
        public Deck Create(string name)
        {
            var deck = this.deckRepository.Create();

            if (name is null || name == string.Empty)
            {
                throw new UnauthorizedAccessException("Wrong deck name");
            }

            deck.Name = name;
            this.deckRepository.Save(deck);
            return deck;
        }
    }
}
