using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    public class CardService
    {
        private InMemoryCardRepository cardRepository;
        
        public CardService(InMemoryCardRepository cardRepository)
        {
            this.cardRepository = cardRepository;
        }

        //public Card Create()
        //{
        //    var card = this.cardRepository.Create();
        //    this.cardRepository.Save(card);
        //    return card;
        //}
    }
}
