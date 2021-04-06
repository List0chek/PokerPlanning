using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
using PlanPoker.Services;

namespace PlanPoker.Controllers 
{
    /// <summary>
    /// Класс UserController.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        /// <summary>
        /// Создает нового пользователя.
        /// </summary>
        /// <param name="name">Имя пользователя.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        [HttpPost]
        public UserDTO Create(string name)
        {
            return new UserDTOConverter().Convert(this.userService.Create(name));
        }

        /// <summary>
        /// Меняет имя пользователя.
        /// </summary>
        /// <param name="newName">Новое имя пользоваетля.</param>
        /// <param name="id">Id пользователя.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        [HttpPost]
        public UserDTO ChangeName(Guid id, string token, string newName)
        {
            return new UserDTOConverter().Convert(this.userService.ChangeName(id, token, newName));
        }
    }
}
