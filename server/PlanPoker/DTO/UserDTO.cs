using System;

namespace PlanPoker.Models
{
    public class UserDTO
    {
        /// <summary>
        /// Id пользователя.
        /// </summary>
        public Guid Id { get; set; }

        /// <summary>
        /// Имя пользователя.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Токен пользователя.
        /// </summary>
        public string Token { get; set; }
    }
}
