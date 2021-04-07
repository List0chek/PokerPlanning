using PlanPoker.Models;

namespace PlanPoker.DTO.Converters
{
    /// <summary>
    /// Класс VoteDTOConverter.
    /// </summary>
    public class VoteDTOConverter
    {
        /// <summary>
        /// Метод конвертации Vote в VoteDTO.
        /// </summary>
        /// <param name="vote">Экземпляр Vote.</param>
        /// <returns>Экземпляр VoteDTO.</returns>
        public VoteDTO Convert(Vote vote)
        {
            return new VoteDTO()
            {
                Id = vote.Id,
                CardId = vote.CardId,
                RoomId = vote.RoomId,
                DiscussionId = vote.DiscussionId,
                UserId = vote.UserId,
                Card = new CardDTOConverter().Convert(vote.Card)
            };
        }
    }
}
