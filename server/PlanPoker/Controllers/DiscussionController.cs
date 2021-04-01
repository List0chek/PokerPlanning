using Microsoft.AspNetCore.Mvc;
using PlanPoker.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Controllers
{
    /// <summary>
    /// Класс DiscussionController.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DiscussionController : ControllerBase
    {
        /// <summary>
        /// Экземпляр DiscussionService.
        /// </summary>
        private readonly DiscussionService discussionService;

        /// <summary>
        /// Конструктор класса DiscussionController.
        /// </summary>
        /// <param name="discussionService">Экземпляр DeckService.</param>
        public DiscussionController(DiscussionService discussionService)
        {
            this.discussionService = discussionService;
        }

        /// <summary>
        /// Создает новое обсуждение. 
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой создается новое обсуждение.</param>
        /// <param name="topic">Название темы обсуждения.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        [HttpPost]
        public object Create(Guid roomId, string topic)
        {
            return this.discussionService.Create(roomId, topic);
        }

        /// <summary>
        /// Создает оценку пользователя обсуждению.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <param name="deckId">Id колоды.</param>
        /// <param name="cardId">Id карты.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        [HttpPost]
        public object SetMark(Guid discussionId, Guid userId, Guid deckId, Guid cardId)
        {
            return this.discussionService.SetMark(discussionId, userId, deckId, cardId);
        }

        [HttpPost]
        public object ChangeMark(Guid markId, Guid newCardId)
        {
            return this.discussionService.ChangeMark(markId, newCardId);
        }

        /// <summary>
        /// Закрывает обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой нужно закрыть обсуждение.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        [HttpPost]
        public object Close(Guid roomId, Guid discussionId)
        {
            return this.discussionService.Close(roomId, discussionId);
        }
    }
}
