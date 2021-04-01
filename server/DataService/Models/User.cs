﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataService.Models;

namespace PlanPoker.Models
{
    /// <summary>
    /// Класс пользователь.
    /// </summary>
    public class User : Entity
    {
        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Токен пользователя.
        /// </summary>
        public string Token { get; set; }

        /// <summary>
        /// Конструктор класса User.
        /// </summary>
        /// <param name="id">Id сущности User.</param>
        public User(Guid id) : base(id)
        {
        }
    }
}
