using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO.Converters
{
    public class DeckDTOConverter
    {
        public DeckDTO Convert(Deck deck)
        {
            return new DeckDTO()
            {
                Id = deck.Id,
                Name = deck.Name,
                Cards = deck.Cards.Select(item => new CardDTOConverter().Convert(item)).ToList()
            };
        }
    }
}
