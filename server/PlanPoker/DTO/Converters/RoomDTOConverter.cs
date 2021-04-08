using DataService;
using PlanPoker.Models;
using System.Linq;

namespace PlanPoker.DTO.Converters
{
    /// <summary>
    /// Класс RoomDTOConverter.
    /// </summary>
    public class RoomDTOConverter
    {
        /// <summary>
        /// Экземпляр InMemoryVoteRepository.
        /// </summary>
        private readonly IRepository<Vote> voteRepository;

        /// <summary>
        /// Экземпляр InMemoryDiscussionRepository.
        /// </summary>
        private readonly IRepository<Discussion> discussionRepository;

        /// <summary>
        /// Конструктор класса RoomDTOConverter.
        /// </summary>
        /// <param name="voteRepository">Экземпляр InMemoryVoteRepository.</param>
        /// <param name="discussionRepository">Экземпляр InMemoryDiscussionRepository.</param>
        public RoomDTOConverter(IRepository<Vote> voteRepository, IRepository<Discussion> discussionRepository)
        {
            this.voteRepository = voteRepository;
            this.discussionRepository = discussionRepository;
        }

        /// <summary>
        /// Метод конвертации Room в RoomDTO.
        /// </summary>
        /// <param name="room">Экземпляр Room.</param>
        /// <returns>Экземпляр RoomDTO.</returns>
        public RoomDTO Convert(Room room)
        {
            var discussionList = this.discussionRepository?.GetAll()
                .Select(item => new DiscussionDTOConverter(this.voteRepository).Convert(item))
                .Where(item => item.RoomId.Equals(room.Id))
                .ToList();
            return new RoomDTO()
            {
                Id = room.Id,
                Name = room.Name,
                OwnerId = room.OwnerId,
                HostId = room.HostId,
                Members = room.Members.Select(item => new UserDTOConverter().Convert(item)).ToList(),
                Discussions = discussionList,
                HashCode = room.HashCode
            };
        }
    }
}
