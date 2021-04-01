using DataService.Models;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.Models;
using PlanPoker.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        /// Экземпляр DeckService.
        /// </summary>
        private readonly DeckService deckService;

        /// <summary>
        /// Конструктор класса DeckController.
        /// </summary>
        /// <param name="deckService">Экземпляр DeckService.</param>
        public DeckController(DeckService deckService)
        {
            this.deckService = deckService;
        }

        /// <summary>
        /// Создает экземпляр Deck.
        /// </summary>
        /// <param name="name"></param>
        /// <returns>Возвращает Deck.</returns>
        [HttpPost]
        public object Create(string name)
        {
            return this.deckService.Create(name);
        }

        /// <summary>
        /// Добавляет карты в колоду по Id колоды.
        /// </summary>
        /// <param name="deckId"></param>
        /// <returns>Возвращает лист карт.</returns>
        [HttpPost]
        public object AddCards(Guid deckId)
        {
            return this.deckService.AddDefaultCards(deckId);
        }
    }
}
