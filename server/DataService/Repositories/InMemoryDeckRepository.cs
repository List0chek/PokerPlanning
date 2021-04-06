using DataService.Models;
using PlanPoker.Models;

namespace DataService.Repositories
{
    /// <summary>
    /// DeckRepository. 
    /// </summary>
    public class InMemoryDeckRepository : InMemoryRepository<Deck>
    {
        private IRepository<Card> cardRepository;

        public Card Card { get; set; }

        public InMemoryDeckRepository(IRepository<Card> cardRepository)
        {
            this.cardRepository = cardRepository;
            var card1 = this.cardRepository.Create();
            card1.Name = "0";
            card1.Value = "0";
            this.cardRepository.Save(card1);

            this.cardRepository.Create();
            var card2 = this.cardRepository.Create();
            card2.Name = "0";
            card2.Value = "0";
            this.cardRepository.Save(card2);

            this.cardRepository.Create();
            var card3 = this.cardRepository.Create();
            card3.Name = "1";
            card3.Value = "1";
            this.cardRepository.Save(card3);

            this.cardRepository.Create();
            var card4 = this.cardRepository.Create();
            card4.Name = "2";
            card4.Value = "2";
            this.cardRepository.Save(card4);

            this.cardRepository.Create();
            var card5 = this.cardRepository.Create();
            card5.Name = "3";
            card5.Value = "3";
            this.cardRepository.Save(card5);

            this.cardRepository.Create();
            var card6 = this.cardRepository.Create();
            card6.Name = "5";
            card6.Value = "5";
            this.cardRepository.Save(card6);

            this.cardRepository.Create();
            var card7 = this.cardRepository.Create();
            card7.Name = "8";
            card7.Value = "8";
            this.cardRepository.Save(card7);

            this.cardRepository.Create();
            var card8 = this.cardRepository.Create();
            card8.Name = "13";
            card8.Value = "13";
            this.cardRepository.Save(card8);

            this.cardRepository.Create();
            var card9 = this.cardRepository.Create();
            card9.Name = "21";
            card9.Value = "21";
            this.cardRepository.Save(card9);

            this.cardRepository.Create();
            var card10 = this.cardRepository.Create();
            card10.Name = "34";
            card10.Value = "34";
            this.cardRepository.Save(card10);

            this.cardRepository.Create();
            var card11 = this.cardRepository.Create();
            card11.Name = "55";
            card11.Value = "55";
            this.cardRepository.Save(card11);

            this.cardRepository.Create();
            var card12 = this.cardRepository.Create();
            card12.Name = "89";
            card12.Value = "89";
            this.cardRepository.Save(card12);

            this.cardRepository.Create();
            var card13 = this.cardRepository.Create();
            card13.Name = "?";
            card13.Value = "?";
            this.cardRepository.Save(card13);

            this.cardRepository.Create();
            var card14 = this.cardRepository.Create();
            card14.Name = "∞";
            card14.Value = "∞";
            this.cardRepository.Save(card14);

            this.cardRepository.Create();
            var card15 = this.cardRepository.Create();
            card15.Name = "☕";
            card15.Value = "☕";
            this.cardRepository.Save(card15);
        }
    }
}
