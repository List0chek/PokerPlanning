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
        private InMemoryRoomRepository roomRepository;
        private InMemoryUserRepository userRepository;

        public RoomService(InMemoryRoomRepository roomRepository, InMemoryUserRepository userRepository)
        {
            this.roomRepository = roomRepository;
            this.userRepository = userRepository;
        }

        /// <summary>
        /// Создает новую комнату.
        /// </summary>
        /// <param name="name">Имя комнаты.</param>
        /// <param name="ownerId">Id владельца.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room Create(string name, Guid ownerId)
        {
            var newRoom = this.roomRepository.Create();
            var owner = this.userRepository.Get(ownerId);
            newRoom.Name = name;
            newRoom.OwnerId = owner.Id;
            newRoom.HostId = owner.Id;
            newRoom.Members = new List<User>();

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
        public Room AddMember(Guid roomId, Guid newUserId) // сделать проверку на хозяина комнаты
        {
            var newUser = this.userRepository.Get(newUserId);
            var room = this.roomRepository.Get(roomId);
            if (!room.Members.Contains(newUser))
            {
                room.Members.Add(newUser);
            }
            this.roomRepository.Save(room);
            return room;
        }

        /// <summary>
        /// Позволяет сменить ведущего.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newHostId">Id пользователя, который будет новым ведущим.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        public Room ChangeHost(Guid roomId, Guid newHostId) // сделать проверку на хозяина комнаты
        {
            var updatingRoom = this.roomRepository.Get(roomId);
            var newHost = this.userRepository.Get(newHostId);
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
            return room;
        } 

        //public List<Discussion> GetStory(Guid roomId)
        //{
        //    var room = this.roomRepository.Get(roomId);
        //}
    }
}
