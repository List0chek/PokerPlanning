using DataService;
using DataService.Models;
using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс DeckService.
    /// </summary>
    public class DeckService
    {
        private IRepository<Deck> deckRepository;
        private IRepository<Card> cardRepository;
        private CardService cardService;

        public DeckService(IRepository<Deck> deckRepository, IRepository<Card> cardRepository, CardService cardService)
        {
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
            this.cardService = cardService;
        }

        /// <summary>
        /// Создает новую колоду.
        /// </summary>
        /// <param name="name">Название колоды.</param>
        /// <returns>Возвращает экземпляр Deck.</returns>
        public Deck Create(string name)
        {
            var deck = this.deckRepository.Create();
            deck.Name = name;
            deck.Cards = this.cardRepository.GetAll().ToList();
            this.deckRepository.Save(deck);
            return deck;
        }
    }
}
