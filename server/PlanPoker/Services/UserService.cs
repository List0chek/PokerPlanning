using DataService;
using PlanPoker.Models;
using System;
using System.Linq;

namespace PlanPoker.Services
{
    /// <summary>
    /// Класс UserService.
    /// </summary>
    public class UserService
    {
        /// <summary>
        /// Экземпляр InMemoryUserRepository.
        /// </summary>
        private readonly IRepository<User> userRepository;

        /// <summary>
        /// Конструктор класса UserService.
        /// </summary>
        /// <param name="userRepository">Экземпляр InMemoryUserRepository.</param>
        public UserService(IRepository<User> userRepository)
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

            if (name is null || name == string.Empty)
            {
                throw new ArgumentException("Wrong username");
            }

            newUser.Token = token;
            newUser.Name = name;
            this.userRepository.Save(newUser);
            return newUser;
        }

        /// <summary>
        /// Меняет имя пользователя.
        /// </summary>
        /// <param name="id">Id пользователя.</param>
        /// <param name="token">Token пользователя.</param>
        /// <param name="newName">Новое имя пользоваетля.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        public User ChangeName(Guid id, string token, string newName)
        {
            var user = this.userRepository.Get(id) ?? throw new UnauthorizedAccessException("User not found");

            if (newName is null || newName == string.Empty)
            {
                throw new ArgumentException("Wrong username");
            }

            if (token is null || !user.Token.Equals(token))
            {
                throw new ArgumentException("Wrong token");
            }

            user.Name = newName;
            this.userRepository.Save(user);
            return user;
        }

        /// <summary>
        /// Возвращает пользователя.
        /// </summary>
        /// <param token="token">Токен пользователя.</param>
        /// <returns>Возвращает экземпляр User.</returns>
        public User GetUser(string token)
        {
            if (token is null || token == string.Empty)
            {
                throw new ArgumentException("Wrong token");
            }

            var user = this.userRepository.GetAll().First(item => item.Token == token) ?? throw new UnauthorizedAccessException("User not found");            

            return user;
        }
    }
}
