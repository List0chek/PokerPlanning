using DataService;
using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    public class RoomService
    {
        private IRepository<Room> roomRepository;
        private IRepository<User> userRepository;
        private IRepository<Discussion> discussionRepository;

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
        /// <param name="ownerId">Id владельца.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room Create(string name, Guid ownerId, string ownerToken)
        {
            var newRoom = this.roomRepository.Create();

            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            if (name is null || name == "")
            {
                throw new UnauthorizedAccessException("Room name is not valid");
            }
            if (!owner.Token.Equals(ownerToken) || ownerToken is null)
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
        /// <param name="newUserId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room AddMember(Guid roomId, Guid newUserId, Guid ownerId, string ownerToken) // сделать проверку на хозяина комнаты
        {
            var newUser = this.userRepository.Get(newUserId) ?? throw new UnauthorizedAccessException("User not found");
            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            var room = this.roomRepository.Get(roomId) ?? throw new UnauthorizedAccessException("Room not found");
            if (!owner.Token.Equals(ownerToken) || ownerToken is null)
            {
                throw new UnauthorizedAccessException("Token is not valid");
            }
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
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room ChangeHost(Guid roomId, Guid newHostId, Guid ownerId, string ownerToken)
        {
            var updatingRoom = this.roomRepository.Get(roomId) ?? throw new UnauthorizedAccessException("Room not found");
            var newHost = this.userRepository.Get(newHostId) ?? throw new UnauthorizedAccessException("User not found");
            var owner = this.userRepository.Get(ownerId) ?? throw new UnauthorizedAccessException("User not found");
            if (!owner.Token.Equals(ownerToken) || ownerToken is null)
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

            roomRepository.Save(updatingRoom);
            return updatingRoom;
        }

        /// <summary>
        /// Возвращает информацию о комнате.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room GetRoomInfo(Guid roomId)
        {
            var room = this.roomRepository.Get(roomId);
            room.Discussions = this.discussionRepository.GetAll().Where(item => item.RoomId.Equals(room.Id)).ToList<Discussion>();
            return room;
        }
    }
}
