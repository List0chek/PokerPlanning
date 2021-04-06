using DataService;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace PlanPoker.DTO.Converters
{
    public class DiscussionDTOConverter
    {
        private IRepository<Vote> voteRepository;

        public DiscussionDTOConverter(IRepository<Vote> voteRepository)
        {
            this.voteRepository = voteRepository;
        }
        public DiscussionDTO Convert(Discussion discussion, IRepository<Vote> voteRepository)
        {
            double numerableValue = 0;
            int votesCounter = 0;
            double numerableVotesSum = 0;
            double averageResult = 0;
            var votesList = this.voteRepository.GetAll().Select(item => new VoteDTOConverter().Convert(item)).ToList<VoteDTO>();
            if (votesList.Count > 0)
            {
                foreach (var vote in votesList)
                {
                    Double.TryParse(vote.Card.Value, out numerableValue);
                    numerableVotesSum += numerableValue;
                    votesCounter++;
                }
                averageResult = numerableVotesSum / votesCounter;
            }
            return new DiscussionDTO()
            {
                Id = discussion.Id,
                RoomId = discussion.RoomId,
                Topic = discussion.Topic,
                DateStart = discussion.DateStart,
                DateEnd = discussion.DateEnd,
                //Votes = discussion.Votes?.Select(item => new VoteDTOConverter().Convert(item)).ToList(),
                Votes = votesList,//this.voteRepository.GetAll().Select(item => new VoteDTOConverter().Convert(item)).ToList<VoteDTO>(),
                AverageResult = averageResult,
                Duration = discussion.DateEnd - discussion.DateStart
            };
        }
    }
}
