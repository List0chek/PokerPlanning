using DataService;
using PlanPoker.Models;
using System;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс RoomService.
    /// </summary>
    public class RoomService
    {
        /// <summary>
        /// Экземпляр InMemoryRoomRepository.
        /// </summary>
        private readonly IRepository<Room> roomRepository;

        /// <summary>
        /// Экземпляр InMemoryUserRepository.
        /// </summary>
        private readonly IRepository<User> userRepository;

        /// <summary>
        /// Экземпляр InMemoryDiscussionRepository.
        /// </summary>
        private readonly IRepository<Discussion> discussionRepository;

        /// <summary>
        /// Конструктор класса RoomService.
        /// </summary>
        /// <param name="roomRepository">Экземпляр InMemoryRoomRepository.</param>
        /// <param name="userRepository">Экземпляр InMemoryUserRepository.</param>
        /// <param name="discussionRepository">Экземпляр InMemoryDiscussionRepository.</param>
        public RoomService(IRepository<Room> roomRepository, IRepository<User> userRepository, IRepository<Discussion> discussionRepository)
        {
            this.roomRepository = roomRepository;
            this.userRepository = userRepository;
            this.discussionRepository = discussionRepository;
        }

        /// <summary>
        /// Создает новую комнату.
        /// </summary>
        /// <param name="name">Имя комнаты.</param>
        /// <param name="ownerId">Id создателя.</param>
        /// <param name="ownerToken">Token создателя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room Create(string name, Guid ownerId, string ownerToken)
        {
            var newRoom = this.roomRepository.Create();

            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            if (name is null || name == string.Empty)
            {
                throw new UnauthorizedAccessException("Room name is not valid");
            }

            if (ownerToken is null || !owner.Token.Equals(ownerToken))
            {
                throw new UnauthorizedAccessException("Token is not valid");
            }

            newRoom.Name = name;
            newRoom.OwnerId = owner.Id;
            newRoom.HostId = owner.Id;
            if (!newRoom.Members.Contains(owner))
            {
                newRoom.Members.Add(owner);
            }

            this.roomRepository.Save(newRoom);
            return newRoom;
        }

        /// <summary>
        /// Добавляет пользователя в комнату.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newUserId">Id пользователя, которого нужно добавить в комнату.</param>
        /// <param name="ownerId">Id пользователя, который является владельцем комнаты.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room AddMember(Guid roomId, Guid newUserId, Guid ownerId)
        {
            var newUser = this.userRepository.Get(newUserId) ?? throw new UnauthorizedAccessException("User not found");
            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            var room = this.roomRepository.Get(roomId) ?? throw new UnauthorizedAccessException("Room not found");
            if (!room.OwnerId.Equals(owner.Id))
            {
                throw new UnauthorizedAccessException("Owner is not valid");
            }

            if (!room.Members.Contains(newUser))
            {
                room.Members.Add(newUser);
                this.roomRepository.Save(room);
            }

            return room;
        }

        /// <summary>
        /// Позволяет сменить ведущего.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newHostId">Id пользователя, который будет новым ведущим.</param>
        /// <param name="ownerId">Id пользователя, который является владельцем комнаты.</param>
        /// <param name="ownerToken">Токен владельца комнаты.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room ChangeHost(Guid roomId, Guid newHostId, Guid ownerId, string ownerToken)
        {
            var updatingRoom = this.roomRepository.Get(roomId) ?? throw new UnauthorizedAccessException("Room not found");
            var newHost = this.userRepository.Get(newHostId) ?? throw new UnauthorizedAccessException("User not found");
            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            if (ownerToken is null || !owner.Token.Equals(ownerToken))
            {
                throw new UnauthorizedAccessException("Token is not valid");
            }

            if (!updatingRoom.OwnerId.Equals(owner.Id))
            {
                throw new UnauthorizedAccessException("Owner is not valid");
            }

            updatingRoom.HostId = newHost.Id;
            if (!updatingRoom.Members.Contains(newHost))
            {
                updatingRoom.Members.Add(newHost);
            }

            this.roomRepository.Save(updatingRoom);
            return updatingRoom;
        }

        /// <summary>
        /// Возвращает информацию о комнате.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room GetRoomInfo(Guid roomId, Guid userId)
        {
            var room = this.roomRepository.Get(roomId) ?? throw new UnauthorizedAccessException("Room not found");
            var user = this.userRepository.Get(userId) ?? throw new UnauthorizedAccessException("User not found");
            if (!room.Members.Contains(user))
            {
                throw new UnauthorizedAccessException("User does not belong to this room");
            }

            return room;
        }
    }
}
