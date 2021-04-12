using DataService;
using PlanPoker.Models;
using System;
using System.Linq;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс VoteService.
    /// </summary>
    public class VoteService
    {
        /// <summary>
        /// Экземпляр InMemoryVoteRepository.
        /// </summary>
        private readonly IRepository<Vote> voteRepository;

        /// <summary>
        /// Экземпляр InMemoryUserRepository.
        /// </summary>
        private readonly IRepository<User> userRepository;

        /// <summary>
        /// Экземпляр InMemoryCardRepository.
        /// </summary>
        private readonly IRepository<Card> cardRepository;

        /// <summary>
        /// Экземпляр InMemoryDiscussionRepository.
        /// </summary>
        private readonly IRepository<Discussion> discussionRepository;

        /// <summary>
        /// Конструктор класса VoteService.
        /// </summary>
        /// <param name="voteRepository">Экземпляр InMemoryVoteRepository.</param>
        /// <param name="cardRepository">Экземпляр InMemoryCardRepository.</param>
        /// <param name="discussionRepository">Экземпляр InMemoryDiscussionRepository.</param>
        /// <param name="userRepository">Экземпляр InMemoryUserRepository.</param>
        public VoteService(
            IRepository<Vote> voteRepository,
            IRepository<Card> cardRepository,
            IRepository<Discussion> discussionRepository,
            IRepository<User> userRepository)
        {
            this.voteRepository = voteRepository;
            this.cardRepository = cardRepository;
            this.discussionRepository = discussionRepository;
            this.userRepository = userRepository;
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
            var card = this.cardRepository.Get(cardId) ?? throw new ArgumentException("Card not found");
            var discussion = this.discussionRepository.Get(discussionId) ?? throw new ArgumentException("Discussion not found");
            var user = this.userRepository.Get(userId) ?? throw new ArgumentException("User not found");
            if (this.voteRepository.GetAll().Where(item => item.UserId.Equals(user.Id)).Count() == 0)
            {
                var vote = this.voteRepository.Create();
                vote.CardId = card.Id;
                vote.DiscussionId = discussion.Id;
                vote.UserId = user.Id;
                vote.RoomId = discussion.RoomId;
                vote.Card = card;
                this.voteRepository.Save(vote);
                return vote;
            }
            else throw new ArgumentException("User already did a vote");
        }

        /// <summary>
        /// Изменяет выбранную карту в оценке.
        /// </summary>
        /// <param name="voteId">Id оценки.</param>
        /// <param name="newCardId">Id карты, на которую происходит замента старой.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Vote.</returns>
        public Vote Change(Guid voteId, Guid newCardId, Guid userId)
        {
            var vote = this.voteRepository.Get(voteId) ?? throw new ArgumentException("Vote not found");
            var newCard = this.cardRepository.Get(newCardId) ?? throw new ArgumentException("Card not found");
            var user = this.userRepository.Get(userId) ?? throw new ArgumentException("User not found");
            if (!vote.UserId.Equals(user.Id))
            {
                throw new ArgumentException("User is not valid");
            }

            vote.CardId = newCard.Id;
            vote.Card = newCard;
            this.voteRepository.Save(vote);
            return vote;
        }
    }
}
