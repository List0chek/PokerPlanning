using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO
{
    public class DeckDTO
    {
        /// <summary>
        /// Id колоды.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Имя сущности Deck.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Набор карт.
        /// </summary>
        public IEnumerable<CardDTO> Cards { get; set; }
    }
}
