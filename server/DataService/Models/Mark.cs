using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    /// <summary>
    /// Класс оценка.
    /// </summary>
    public class Mark : Entity
    {
        //public Guid Id { get; }

        /// <summary>
        /// Id сущности Card.
        /// </summary>
        public Guid CardId { get; set; }

        /// <summary>
        /// Id сущности Room.
        /// </summary>
        public Guid RoomId { get; set; }

        /// <summary>
        /// Id сущности Discussion.
        /// </summary>
        public Guid DiscussionId { get; set; }

        /// <summary>
        /// Id сущности User.
        /// </summary>
        public Guid UserId { get; set; }

        //public Mark(Guid cardId, Guid roomId, Guid discussionId, Guid userId)
        //{
        //    this.Id = Guid.NewGuid();
        //    this.CardId = cardId;
        //    this.RoomId = roomId;
        //    this.DiscussionId = discussionId;
        //    this.UserId = userId;
        //}

        /// <summary>
        /// Конструктор класса Mark.
        /// </summary>
        /// <param name="id">Id сущности Mark.</param>
        public Mark(Guid id) : base(id)
        {
        }
    }
}
