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
        private InMemoryDeckRepository deckRepository;
        private InMemoryCardRepository cardRepository;
        private CardService cardService;

        public DeckService(InMemoryDeckRepository deckRepository, InMemoryCardRepository cardRepository, CardService cardService)
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
            this.deckRepository.Save(deck);
            return deck;
        }

        /// Убрать метод из сервиса и зашить краты в репозитории.
        public List<Card> AddDefaultCards(Guid deckId)
        {
            int sum = 0;
            int first = 0;
            int second = 1;
            var deck = this.deckRepository.Get(deckId);
            deck.Cards = new List<Card>();

            var card = this.cardRepository.Create();
            card.Name = sum.ToString();
            card.Value = sum.ToString();
            this.cardRepository.Save(card);
            deck.Cards.Add(card);

            for (int i = 0; i < 11; i++)
            {
                card = this.cardRepository.Create();
                card.Name = sum.ToString();
                card.Value = sum.ToString();
                this.cardRepository.Save(card);
                deck.Cards.Add(card);
                sum = first + second;
                first = second;
                second = sum;
            }
            this.deckRepository.Save(deck);
            return deck.Cards;
        }
    }
}
