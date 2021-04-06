using DataService;
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
        private IRepository<Card> cardRepository;
        
        public CardService(IRepository<Card> cardRepository)
        {
            this.cardRepository = cardRepository;
        }
    }
}
