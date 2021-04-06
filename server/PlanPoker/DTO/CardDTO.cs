using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Models
{
    public class CardDTO 
    {
        /// <summary>
        /// Id карты.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Имя сущности Card.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Значение сущности Card.
        /// </summary>
        public string Value { get; set; }
    }
}
