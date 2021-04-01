using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    /// <summary>
    /// Класс комната.
    /// </summary>
    public class Room : Entity
    {
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
        public List<User> Members { get; set; }

        /// <summary>
        /// Хеш код для URL.
        /// </summary>
        public HashCode HashCode { get; set; }

        /// <summary>
        /// Конструктор класса Room.
        /// </summary>
        /// <param name="id">Id сущности Room.</param>
        public Room(Guid id) : base(id)
        {
        }
    }
}
