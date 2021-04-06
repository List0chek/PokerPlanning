using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO.Converters
{
    public class CardDTOConverter
    {
        public CardDTO Convert(Card card)
        {
            return new CardDTO()
            {
                Id = card.Id,
                Name = card.Name,
                Value = card.Value
            };
        }
    }
}
