using DataService;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
using PlanPoker.Services;
using System;

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
        /// Экземпляр InMemoryVoteRepository.
        /// </summary>
        private readonly IRepository<Vote> voteRepository;

        /// <summary>
        /// Экземпляр DiscussionService.
        /// </summary>
        private readonly DiscussionService discussionService;

        /// <summary>
        /// Экземпляр InMemoryUserRepository.
        /// </summary>
        private readonly IRepository<User> userRepository;

        /// <summary>
        /// Конструктор класса DiscussionController.
        /// </summary>
        /// <param name="discussionService">Экземпляр DiscussionService.</param>
        /// <param name="voteRepository">Экземпляр InMemoryVoteRepository.</param>
        /// <param name="userRepository">Экземпляр InMemoryUserRepository.</param>
        public DiscussionController(DiscussionService discussionService, IRepository<Vote> voteRepository, IRepository<User> userRepository)
        {
            this.discussionService = discussionService;
            this.voteRepository = voteRepository;
            this.userRepository = userRepository;
        }

        /// <summary>
        /// Создает новое обсуждение. 
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой создается новое обсуждение.</param>
        /// <param name="topic">Название темы обсуждения.</param>
        /// <param name="hostId">Id ведущего.</param>
        /// <param name="hostToken">Token ведущего.</param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpPost]
        public DiscussionDTO Create(Guid roomId, string topic, Guid hostId, [FromHeader]string hostToken)
        {
            var discussion = this.discussionService.Create(roomId, topic, hostId, hostToken);
            return new DiscussionDTOConverter(this.voteRepository, this.userRepository).Convert(discussion);
        }

        /// <summary>
        /// Создает оценку пользователя обсуждению.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <param name="cardId">Id карты.</param>
        [HttpPost]
        public void SetVote(Guid discussionId, Guid userId, Guid cardId)
        {
            this.discussionService.SetVote(discussionId, userId, cardId);
        }

        /// <summary>
        /// Закрывает обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой нужно закрыть обсуждение.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="hostId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpPost]
        public DiscussionDTO Close(Guid roomId, Guid discussionId, Guid hostId)
        {
            var discussion = this.discussionService.Close(roomId, discussionId, hostId);
            return new DiscussionDTOConverter(this.voteRepository, this.userRepository).Convert(discussion);
        }

        /// <summary>
        /// Удаляет обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты, в которой нужно закрыть обсуждение.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="hostId">Id пользователя.</param>
        [HttpPost]
        public void Delete(Guid roomId, Guid discussionId, Guid hostId)
        {
            this.discussionService.Delete(roomId, discussionId, hostId);
        }

        /// <summary>
        /// Возвращает оценки участников обсуждения и итоговую среднюю оценку.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр DiscussionDTO.</returns>
        [HttpGet]
        public DiscussionDTO GetResults(Guid discussionId, Guid userId)
        {
            var discussion = this.discussionService.GetResults(discussionId, userId);
            return new DiscussionDTOConverter(this.voteRepository, this.userRepository).Convert(discussion);
        }
    }
}
