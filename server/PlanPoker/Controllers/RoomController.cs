using Microsoft.AspNetCore.Mvc;
using PlanPoker.Models;
using PlanPoker.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Controllers
{
    /// <summary>
    /// Класс RoomController.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomService roomService;

        public RoomController(RoomService roomService)
        {
            this.roomService = roomService;
        }

        /// <summary>
        /// Создает новую комнату.
        /// </summary>
        /// <param name="name">Имя комнаты.</param>
        /// <param name="ownerId">Id создателя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        [HttpPost]
        public object Create(string name, Guid ownerId)
        {
            return this.roomService.Create(name, ownerId);
        }

        /// <summary>
        /// Делает пользователя участником комнаты.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newUserId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        [HttpPost]
        public object AddMember(Guid roomId, Guid newUserId)
        {
            return this.roomService.AddMember(roomId, newUserId);
        }

        /// <summary>
        /// Возвращает информацию о комнате.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        [HttpGet]
        public object GetRoomInfo(Guid roomId)
        {
            return this.roomService.GetRoomInfo(roomId);
        }


        /// <summary>
        /// Позволяет изменить ведущего.
        /// </summary>
        /// <param name="roomId">Id комнаты.</param>
        /// <param name="newHostId">Id пользователя.</param>
        /// <returns>Возвращает экземпляр Room.</returns>
        [HttpPost]
        public object ChangeHost(Guid roomId, Guid newHostId)
        {
            return this.roomService.ChangeHost(roomId, newHostId);
        }
    }
}
