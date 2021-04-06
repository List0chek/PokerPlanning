using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO.Converters
{
    public class VoteDTOConverter
    {
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
