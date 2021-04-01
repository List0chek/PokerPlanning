using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс MarkService.
    /// </summary>
    public class MarkService
    {
        private InMemoryMarkRepository markRepository;
        private InMemoryRoomRepository roomRepository;
        private InMemoryUserRepository userRepository;
        private InMemoryCardRepository cardRepository;
        private InMemoryDiscussionRepository discussionRepository;

        public MarkService(
            InMemoryMarkRepository markRepository, 
            InMemoryCardRepository cardRepository, 
            InMemoryDiscussionRepository discussionRepository, 
            InMemoryUserRepository userRepository, 
            InMemoryRoomRepository roomRepository)
        {
            this.markRepository = markRepository;
            this.cardRepository = cardRepository;
            this.discussionRepository = discussionRepository;
            this.userRepository = userRepository;
            this.roomRepository = roomRepository;
        }

        /// <summary>
        /// Создает новую оценку.
        /// </summary>
        /// <param name="cardId">Id выбранной карты.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Mark.</returns>
        public Mark Create(Guid cardId, Guid discussionId, Guid userId)
        {
            var mark = this.markRepository.Create();

            var card = this.cardRepository.Get(cardId);
            var discussion = this.discussionRepository.Get(discussionId);
            var user = this.userRepository.Get(userId);
            
            mark.CardId = card.Id;
            mark.DiscussionId = discussion.Id;
            mark.UserId = user.Id;
            mark.RoomId = discussion.RoomId;
            this.markRepository.Save(mark);
            return mark;
        }

        /// <summary>
        /// Изменяет выбранную карту в оценке.
        /// </summary>
        /// <param name="markId">Id оценки.</param>
        /// <param name="newCardId">Id карты, на которую происходит замента старой.</param>
        /// <returns>Возвращает экземпляр Mark.</returns>
        public Mark Change(Guid markId, Guid newCardId)
        {
            var mark = this.markRepository.Get(markId);
            var newCard = this.cardRepository.Get(newCardId);
            mark.CardId = newCard.Id;
            this.markRepository.Save(mark);
            return mark;
        }
    }
}
