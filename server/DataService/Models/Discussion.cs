using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    /// <summary>
    /// Класс обсуждения.
    /// </summary>
    public class Discussion : Entity
    {
        /// <summary>
        /// Id сущности Room.
        /// </summary>
        public Guid RoomId { get; set; }

        /// <summary>
        /// Тема обсуждения.
        /// </summary>
        public string Topic { get; set; }

        /// <summary>
        /// Дата начала.
        /// </summary>
        public DateTime DateStart { get; set; }

        /// <summary>
        /// Дата начала.
        /// </summary>
        public DateTime DateEnd { get; set; }

        /// <summary>
        /// Лист оценок.
        /// </summary>
        ///public List<Mark> Marks { get; set; }

        public bool IsClosed = false;

        /// <summary>
        /// Конструктор класса Discussion.
        /// </summary>
        /// <param name="id">Id сущности Discussion.</param>
        public Discussion(Guid id) : base(id)
        {
        }
    }
}
