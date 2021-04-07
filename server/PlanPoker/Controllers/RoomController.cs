﻿using DataService;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
using PlanPoker.Services;
using System;

namespace PlanPoker.Controllers
{
    /// <summary>
    /// Класс RoomController.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        /// <summary>
        /// Экземпляр RoomService.
        /// </summary>
        private readonly RoomService roomService;

        /// <summary>
        /// Экземпляр InMemoryVoteRepository.
        /// </summary>
        private IRepository<Vote> voteRepository;

        /// <summary>
        /// Экземпляр InMemoryDiscussionRepository.
        /// </summary>
        private IRepository<Discussion> discussionRepository;

        /// <summary>
        /// Конструктор RoomController.
        /// </summary>
        /// <param name="roomService">Экземпляр RoomService.</param>
        /// <param name="voteRepository">Экземпляр InMemoryVoteRepository.</param>
        /// <param name="discussionRepository">Экземпляр InMemoryDiscussionRepository.</param>
        public RoomController(RoomService roomService, IRepository<Vote> voteRepository, IRepository<Discussion> discussionRepository)
        {
            this.roomService = roomService;
            this.voteRepository = voteRepository;
            this.discussionRepository = discussionRepository;
        }

        /// <summary>
        /// Создает новую комнату.
        /// </summary>
        /// <param name="name">Имя комнаты.</param>
        /// <param name="ownerId">Id создателя.</param>
        /// <param name="ownerToken">Token создателя.</param>
        /// <returns>Возвращает экземпляр RoomDTO.</returns>
        [HttpPost]
        public RoomDTO Create(string name, Guid ownerId, string ownerToken)
        {
            var room = this.roomService.Create(name, ownerId, ownerToken);
            return new RoomDTOConverter(this.voteRepository, this.discussionRepository).Convert(room);
        }

        /// <summary>
        /// Делает пользователя участником комнаты.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newUserId">Id пользователя, которого нужно добавить.</param>
        /// <param name="ownerId">Id владельца комнаты.</param>
        /// <returns>Возвращает экземпляр RoomDTO.</returns>
        [HttpPost]
        public RoomDTO AddMember(Guid roomId, Guid newUserId, Guid ownerId)
        {
            var room = this.roomService.AddMember(roomId, newUserId, ownerId);
            return new RoomDTOConverter(this.voteRepository, this.discussionRepository).Convert(room);
        }

        /// <summary>
        /// Возвращает информацию о комнате.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="userId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр RoomDTO.</returns>
        [HttpGet]
        public RoomDTO GetRoomInfo(Guid roomId, Guid userId)
        {
            var room = this.roomService.GetRoomInfo(roomId, userId);
            return new RoomDTOConverter(this.voteRepository, this.discussionRepository).Convert(room);
        }


        /// <summary>
        /// Позволяет изменить ведущего.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newHostId">Id пользователя, который будет новым ведущим.</param>
        /// <param name="ownerId">Id пользователя, который является владельцем комнаты.</param>
        /// <param name="ownerToken">Токен владельца комнаты.</param>
        /// <returns>Возвращает экземпляр RoomDTO.</returns>
        [HttpPost]
        public RoomDTO ChangeHost(Guid roomId, Guid newHostId, Guid ownerId, string ownerToken)
        {
            var room = this.roomService.ChangeHost(roomId, newHostId, ownerId, ownerToken);
            return new RoomDTOConverter(this.voteRepository, this.discussionRepository).Convert(room);
        }
    }
}
