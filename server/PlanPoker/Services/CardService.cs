using DataService;
using PlanPoker.Models;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс CardService.
    /// </summary>
    public class CardService
    {
        /// <summary>
        /// Экземпляр InMemoryCardRepository.
        /// </summary>
        private IRepository<Card> cardRepository;

        /// <summary>
        /// Конструктор класса CardService.
        /// </summary>
        /// <param name="cardRepository">Экземпляр InMemoryCardRepository.</param>
        public CardService(IRepository<Card> cardRepository)
        {
            this.cardRepository = cardRepository;
        }
    }
}
