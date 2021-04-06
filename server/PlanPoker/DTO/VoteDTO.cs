using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    public class VoteDTO
    {
        /// <summary>
        /// Id оценки.
        /// </summary>
        public Guid Id { get; set; }

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

        public CardDTO Card { get; set; }
    }
}
