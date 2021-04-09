﻿using Microsoft.AspNetCore.Mvc;
using PlanPoker.DTO.Converters;
using PlanPoker.Models;
using PlanPoker.Services;
using System;

namespace PlanPoker.Controllers
{
    /// <summary>
    /// Класс UserController.
    /// </summary>
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        /// <summary>
        /// Экземпляр класса UserService.
        /// </summary>
        private readonly UserService userService;

        /// <summary>
        /// Конструктор класса UserController.
        /// </summary>
        /// <param name="userService">Экземпляр класса UserService.</param>
        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        /// <summary>
        /// Создает нового пользователя.
        /// </summary>
        /// <param name="name">Имя пользователя.</param>
        /// <returns>Возвращает экземпляр UserDTO.</returns>
        [HttpPost]
        public UserDTO Create(string name)
        {
            var user = this.userService.Create(name);
            return new UserDTOConverter().Convert(user);
        }

        /// <summary>
        /// Меняет имя пользователя.
        /// </summary>
        /// <param name="id">Id пользователя.</param>
        /// <param name="token">Token пользователя.</param>
        /// <param name="newName">Новое имя пользоваетля.</param>
        /// <returns>Возвращает экземпляр UserDTO.</returns>
        [HttpPost]
        public UserDTO ChangeName(Guid id, string token, string newName)
        {
            var user = this.userService.ChangeName(id, token, newName);
            return new UserDTOConverter().Convert(user);
        }
    }
}