using DataService.Repositories;
using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс UserService.
    /// </summary>
    public class UserService 
    {
        private InMemoryUserRepository userRepository;

        public UserService(InMemoryUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        /// <summary>
        /// Создает нового пользоваетля.
        /// </summary>
        /// <param name="name">Имя пользователя.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        public User Create(string name)
        {
            var newUser = this.userRepository.Create();
            var token = Convert.ToBase64String(newUser.Id.ToByteArray());
            newUser.Token = token;
            newUser.Name = name;
            this.userRepository.Save(newUser);
            return newUser;
        }

        /// <summary>
        /// Меняет имя пользователя.
        /// </summary>
        /// <param name="id">Id пользователя.</param>
        /// <param name="newName">Новое имя пользоваетля.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        public User ChangeName(Guid id, string newName)
        {
            var user = userRepository.Get(id);
            user.Name = newName;
            this.userRepository.Save(user);
            return user;
        }
    }
}
