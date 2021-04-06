using DataService;
using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс VoteService.
    /// </summary>
    public class VoteService
    {
        private IRepository<Vote> voteRepository;
        private IRepository<Room> roomRepository;
        private IRepository<User> userRepository;
        private IRepository<Card> cardRepository;
        private IRepository<Discussion> discussionRepository;

        public VoteService(
            IRepository<Vote> voteRepository,
            IRepository<Card> cardRepository,
            IRepository<Discussion> discussionRepository,
            IRepository<User> userRepository, 
            IRepository<Room> roomRepository)
        {
            this.voteRepository = voteRepository;
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
        /// <returns>Возвращает экземпляр Vote.</returns>
        public Vote Create(Guid cardId, Guid discussionId, Guid userId)
        {
            var vote = this.voteRepository.Create();

            var card = this.cardRepository.Get(cardId);
            var discussion = this.discussionRepository.Get(discussionId);
            var user = this.userRepository.Get(userId);
            
            vote.CardId = card.Id;
            vote.DiscussionId = discussion.Id;
            vote.UserId = user.Id;
            vote.RoomId = discussion.RoomId;
            vote.Card = card;
            this.voteRepository.Save(vote);
            return vote;
        }

        /// <summary>
        /// Изменяет выбранную карту в оценке.
        /// </summary>
        /// <param name="voteId">Id оценки.</param>
        /// <param name="newCardId">Id карты, на которую происходит замента старой.</param>
        /// <returns>Возвращает экземпляр Vote.</returns>
        public Vote Change(Guid voteId, Guid newCardId)
        {
            var vote = this.voteRepository.Get(voteId);
            var newCard = this.cardRepository.Get(newCardId);
            vote.CardId = newCard.Id;
            vote.Card = newCard;
            this.voteRepository.Save(vote);
            return vote;
        }
    }
}
