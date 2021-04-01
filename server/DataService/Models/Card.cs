using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    /// <summary>
    /// Класс карты.
    /// </summary>
    public class Card : Entity
    {
        //public Guid Id { get; set; }

        /// <summary>
        /// Имя сущности Card.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Значение сущности Card.
        /// </summary>
        public string Value { get; set; }

        //public Card(string name, string value)
        //{
        //    this.Id = Guid.NewGuid();
        //    this.Name = name;
        //    this.Value = value;
        //}

        /// <summary>
        /// Коснтруктор класса Card.
        /// </summary>
        /// <param name="id">Id сущности Card.</param>
        public Card(Guid id) : base(id)
        {
        }
    }
}
