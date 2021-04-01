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
        private InMemoryDiscussionRepository discussionRepository;
        private InMemoryRoomRepository roomRepository;
        private InMemoryMarkRepository markRepository;
        private InMemoryUserRepository userRepository;
        private InMemoryDeckRepository deckRepository;
        private InMemoryCardRepository cardRepository;
        private MarkService markService;


        /// <summary>
        /// Конструктор класса DiscussionService.
        /// </summary>
        /// <param name="discussionRepository"></param>
        /// <param name="roomRepository"></param>
        /// <param name="markRepository"></param>
        /// <param name="userRepository"></param>
        /// <param name="markService"></param>
        /// <param name="deckRepository"></param>
        /// <param name="cardRepository"></param>
        public DiscussionService(
            InMemoryDiscussionRepository discussionRepository,
            InMemoryRoomRepository roomRepository,
            InMemoryMarkRepository markRepository,
            InMemoryUserRepository userRepository,
            MarkService markService,
            InMemoryDeckRepository deckRepository,
            InMemoryCardRepository cardRepository)
        {
            this.discussionRepository = discussionRepository;
            this.roomRepository = roomRepository;
            this.markRepository = markRepository;
            this.userRepository = userRepository;
            this.markService = markService;
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
            //var user = room.Members.FirstOrDefault(item => item.Id.Equals(room.Id));
            discussion.RoomId = room.Id;
            discussion.Topic = topic;
            discussion.DateStart = DateTime.Now;
            discussion.DateEnd = DateTime.MinValue;
            discussion.IsClosed = false;
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
        public List<Mark> SetMark(Guid discussionId, Guid userId, Guid deckId, Guid cardId) // сделать проверку на принадлежность обсуждения к руму
        {
            var discussion = this.discussionRepository.Get(discussionId);
            var room = this.roomRepository.Get(discussion.RoomId);
            var marksList = this.markRepository.GetAll().Where(item => item.DiscussionId.Equals(discussion.Id)).ToList<Mark>();
            if (discussion.IsClosed == false)
            {
                var user = this.userRepository.Get(userId);
                var deck = this.deckRepository.Get(deckId);
                var card = deck.Cards.FirstOrDefault(item => item.Id.Equals(cardId));
                
                if (!marksList.Any(item => item.UserId.Equals(user.Id)) && room.Members.Contains(user))
                {
                    var mark = this.markService.Create(card.Id, discussion.Id, user.Id);
                    marksList.Add(mark);
                }
                //this.discussionRepository.Save(discussion);
            }

            return marksList;
        }

        public List<Mark> ChangeMark(Guid markId, Guid newCardId)
        {
            var mark = this.markRepository.Get(markId);
            var newCard = this.cardRepository.Get(newCardId);
            var discussion = this.discussionRepository.Get(mark.DiscussionId);
            var marksList = this.markRepository.GetAll().Where(item => item.DiscussionId.Equals(discussion.Id)).ToList<Mark>();
            if (discussion.IsClosed == false)
            {
                mark = this.markService.Change(markId, newCardId);
            }

            //this.discussionRepository.Save(discussion);
            return marksList;
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
            if (discussion.IsClosed == false && discussion.RoomId == room.Id)
            {
                discussion.DateEnd = DateTime.Now;
                discussion.IsClosed = true;
                this.discussionRepository.Save(discussion);
            }

            return discussion;
        }
    }
}
