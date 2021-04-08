﻿using PlanPoker.Models;
using System;
using System.Collections.Generic;

namespace PlanPoker.DTO
{
    /// <summary>
    /// Класс DeckDTO.
    /// </summary>
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
        /// Лист ID карт, которые есть в колоде.
        /// </summary>
        public ICollection<Guid> CardsIDs { get; set; } = new List<Guid>();

        /// <summary>
        /// Набор карт.
        /// </summary>
        public IEnumerable<CardDTO> Cards { get; set; }
    }
}
