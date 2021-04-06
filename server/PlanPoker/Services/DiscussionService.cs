using DataService;
using DataService.Models;
using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс DiscussionService.
    /// </summary>
    public class DiscussionService
    {
        private IRepository<Discussion> discussionRepository;
        private IRepository<Room> roomRepository;
        private IRepository<Vote> voteRepository;
        private IRepository<User> userRepository;
        private IRepository<Deck> deckRepository;
        private IRepository<Card> cardRepository;
        private VoteService voteService;


        /// <summary>
        /// Конструктор класса DiscussionService.
        /// </summary>
        /// <param name="discussionRepository"></param>
        /// <param name="roomRepository"></param>
        /// <param name="voteRepository"></param>
        /// <param name="userRepository"></param>
        /// <param name="voteService"></param>
        /// <param name="deckRepository"></param>
        /// <param name="cardRepository"></param>
        public DiscussionService(
            IRepository<Discussion> discussionRepository,
            IRepository<Room> roomRepository,
            IRepository<Vote> voteRepository,
            IRepository<User> userRepository,
            VoteService voteService,
            IRepository<Deck> deckRepository,
            IRepository<Card> cardRepository)
        {
            this.discussionRepository = discussionRepository;
            this.roomRepository = roomRepository;
            this.voteRepository = voteRepository;
            this.userRepository = userRepository;
            this.voteService = voteService;
            this.deckRepository = deckRepository;
            this.cardRepository = cardRepository;
        }

        /// <summary>
        /// Создает новое обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="topic">Имя обсуждения.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        public Discussion Create(Guid roomId, string topic)                     // Сделать проверку на хоста
        {
            var discussion = this.discussionRepository.Create();
            var room = this.roomRepository.Get(roomId);
            discussion.RoomId = room.Id;
            discussion.Topic = topic;
            discussion.DateStart = DateTime.Now;
            discussion.DateEnd = null;
            this.discussionRepository.Save(discussion);
            return discussion;
        }

        /// <summary>
        /// Метод позволяет выставить оценку в обсуждении.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <param name="deckId">Id колоды.</param>
        /// <param name="cardId">Id выбранной карты.</param>
        /// <returns>Возвращает лист оценок.</returns>
        public List<Vote> SetVote(Guid discussionId, Guid userId, Guid deckId, Guid cardId) // сделать проверку на принадлежность обсуждения к руму
        {
            var discussion = this.discussionRepository.Get(discussionId);
            var room = this.roomRepository.Get(discussion.RoomId);
            var votesList = this.voteRepository.GetAll().Where(item => item.DiscussionId.Equals(discussion.Id)).ToList<Vote>();
            if (discussion.DateEnd == null)
            {
                var user = this.userRepository.Get(userId);
                var deck = this.deckRepository.Get(deckId);
                var card = deck.Cards.FirstOrDefault(item => item.Id.Equals(cardId));
                
                if (!votesList.Any(item => item.UserId.Equals(user.Id)) && room.Members.Contains(user))
                {
                    var vote = this.voteService.Create(card.Id, discussion.Id, user.Id);
                    votesList.Add(vote);
                }
            }

            return votesList;
        }

        /// <summary>
        /// Изменяет оценку.
        /// </summary>
        /// <param name="voteId">Id оценки, которую нужно изменить.</param>
        /// <param name="newCardId">Id новой карты.</param>
        /// <returns>Возвращает лист оценок.</returns>
        public List<Vote> ChangeVote(Guid voteId, Guid newCardId) // Добавить проверку на юзера, который сделал оценку
        {
            var vote = this.voteRepository.Get(voteId);
            var newCard = this.cardRepository.Get(newCardId);
            var discussion = this.discussionRepository.Get(vote.DiscussionId);
            var votesList = this.voteRepository.GetAll().Where(item => item.DiscussionId.Equals(discussion.Id)).ToList<Vote>();
            if (discussion.DateEnd == null)
            {
                vote = this.voteService.Change(voteId, newCardId);
            }
            return votesList;
        }

        /// <summary>
        /// Закрывает обсуждение.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        public Discussion Close(Guid roomId, Guid discussionId) // сделать проверку на принадлежность обсуждения к руму и сделать проверку на хоста
        {
            var discussion = this.discussionRepository.Get(discussionId);
            var room = this.roomRepository.Get(roomId);
            if (discussion.DateEnd == null && discussion.RoomId == room.Id)
            {
                discussion.DateEnd = DateTime.Now;
                this.discussionRepository.Save(discussion);
            }

            return discussion;
        }

        /// <summary>
        /// Возвращает оценки участников обсуждения и итоговую среднюю оценку.
        /// </summary>
        /// <param name="discussionId">Id обсуждения.</param>
        /// <returns>Возвращает экземпляр Discussion.</returns>
        public Discussion GetResults(Guid discussionId, Guid userId)
        {
            var discussion = this.discussionRepository.Get(discussionId);
            var room = this.roomRepository.Get(discussion.RoomId);
            var user = this.userRepository.Get(userId);
            if (room.Members.Contains(user))
            {
                return discussion;
            }
            throw new UnauthorizedAccessException("Wrong userId");
        }
    }
}
