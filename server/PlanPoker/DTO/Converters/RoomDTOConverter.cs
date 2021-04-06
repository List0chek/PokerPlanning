using DataService;
using PlanPoker.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO.Converters
{
    public class RoomDTOConverter
    {
        private IRepository<Vote> voteRepository;

        public RoomDTOConverter()
        {
        }

        public RoomDTOConverter(IRepository<Vote> voteRepository)
        {
            this.voteRepository = voteRepository;
        }
        public RoomDTO Convert(
#nullable enable
            Room?
#nullable disable
            room)
        {
            return new RoomDTO()
            {
                Id = room.Id,
                Name = room.Name,
                OwnerId = room.OwnerId,
                HostId = room.HostId,
                Members = room.Members.Select(item => new UserDTOConverter().Convert(item)).ToList(),
                Discussions = room.Discussions?.Select(item => new DiscussionDTOConverter(voteRepository).Convert(item, voteRepository)).ToList(),
                HashCode = room.HashCode
            };
        }
    }
}
