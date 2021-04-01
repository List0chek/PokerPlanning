using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataService.Models
{   
    /// <summary>
    /// Класс колоды.
    /// </summary>
    public class Deck : Entity
    {
        /// <summary>
        /// Имя сущности Deck.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Набор карт.
        /// </summary>
        public List<Card> Cards { get; set; }

        /// <summary>
        /// Конструктор класса Deck.
        /// </summary>
        /// <param name="id">Id сущности Deck.</param>
        public Deck(Guid id) : base(id)
        {
        }
    }
}
