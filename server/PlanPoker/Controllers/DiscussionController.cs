using DataService;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
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
        private IRepository<Vote> voteRepository;
        /// <summary>
        /// Экземпляр DiscussionService.
        /// </summary>
        private readonly DiscussionService discussionService;

        /// <summary>
        /// Конструктор класса DiscussionController.
        /// </summary>
        /// <param name="discussionService">Экземпляр discussionService.</param>
        public DiscussionController(DiscussionService discussionService, IRepository<Vote> voteRepository)
        {
            this.discussionService = discussionService;
            this.voteRepository = voteRepository;
        }

        /// <summary>
        /// Создает новое обсуждение. 
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой создается новое обсуждение.</param>
        /// <param name="topic">Название темы обсуждения.</param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpPost]
        public DiscussionDTO Create(Guid roomId, string topic)
        {
            return new DiscussionDTOConverter(voteRepository).Convert(this.discussionService.Create(roomId, topic), voteRepository);
        }

        /// <summary>
        /// Создает оценку пользователя обсуждению.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <param name="deckId">Id колоды.</param>
        /// <param name="cardId">Id карты.</param>
        [HttpPost]
        public void SetVote(Guid discussionId, Guid userId, Guid deckId, Guid cardId)
        {
            this.discussionService.SetVote(discussionId, userId, deckId, cardId);
        }

        /// <summary>
        /// Изменяет оценку.
        /// </summary>
        /// <param name="voteId">Id оценки, которую нужно изменить.</param>
        /// <param name="newCardId">Id новой карты.</param>
        [HttpPost]
        public void ChangeVote(Guid voteId, Guid newCardId)
        {
            this.discussionService.ChangeVote(voteId, newCardId);
        }

        /// <summary>
        /// Закрывает обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой нужно закрыть обсуждение.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpPost]
        public DiscussionDTO Close(Guid roomId, Guid discussionId)
        {
            return new DiscussionDTOConverter(voteRepository).Convert(this.discussionService.Close(roomId, discussionId), voteRepository);
        }

        /// <summary>
        /// Возвращает оценки участников обсуждения и итоговую среднюю оценку.
        /// </summary>
        /// <param name="discussionId"></param>
        /// <param name="userId"></param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpGet]
        public DiscussionDTO GetResults(Guid discussionId, Guid userId)
        {
            return new DiscussionDTOConverter(voteRepository).Convert(this.discussionService.GetResults(discussionId, userId), voteRepository);
        }
    }
}
