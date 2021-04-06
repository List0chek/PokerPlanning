using DataService.Models;
using PlanPoker.DTO.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    public class RoomDTO
    {
        /// <summary>
        /// Id комнаты.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Имя комнаты.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Id сущности Owner.
        /// </summary>
        public Guid OwnerId { get; set; }

        /// <summary>
        /// Id сущности Host.
        /// </summary>
        public Guid HostId { get; set; }

        /// <summary>
        /// Список членов комнаты.
        /// </summary>
        public IEnumerable<UserDTO> Members { get; set; }


        /// <summary>
        /// Список всех обсуждений комнаты.
        /// </summary>
        public IEnumerable<DiscussionDTO> Discussions { get; set; } 


        /// <summary>
        /// Хеш код для URL.
        /// </summary>
        public HashCode HashCode { get; set; }
    }
}
