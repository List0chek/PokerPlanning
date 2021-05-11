using DataService.Repositories;
using NUnit.Framework;
using PlanPoker.Services;
using System;

namespace Tests
{
    public class UserServiceTests
    {
        private InMemoryUserRepository userRepository;
        private UserService userService;

        private string userName;
        private string token;

        [SetUp]
        public void SetUp()
        {
            this.userRepository = new InMemoryUserRepository();
            this.userService = new UserService(this.userRepository);
            this.userName = "Name";
            this.token = "token";
        }

        [Test]
        public void CreateUserTest()
        {
            var newUser = this.userService.Create(this.userName);
            Assert.AreEqual(this.userName, newUser.Name);
        }

        [Test]
        public void ChangeUsernameTest()
        {
            var newName = "newName";
            var user = this.userService.Create(this.userName);
            this.userService.ChangeName(user.Id, user.Token, newName);
            Assert.AreEqual(newName, user.Name);
        }

        [Test]
        public void GetUserTest()
        {
            var newUser = this.userService.Create(this.userName);
            var receivedUser = this.userService.GetUser(newUser.Token);
            Assert.AreEqual(newUser, receivedUser);
            Assert.AreEqual(newUser.Id, receivedUser.Id);
            Assert.AreEqual(newUser.Name, receivedUser.Name);
            Assert.AreEqual(newUser.Id, receivedUser.Id);
        }


        [Test]
        public void IsThrowExceptionOnInvalidNameTest()
        {
            Assert.Multiple(() =>
            {
                Assert.Throws<ArgumentException>(() => this.userService.Create(string.Empty), "Wrong username");
                Assert.Throws<UnauthorizedAccessException>(() => this.userService.ChangeName(Guid.NewGuid(), this.token, string.Empty), "User not found");
                Assert.Throws<ArgumentException>(() => this.userService.Create(null), "Wrong username");
                Assert.Throws<UnauthorizedAccessException>(() => this.userService.ChangeName(Guid.NewGuid(), this.token, null), "User not found");
                Assert.Throws<ArgumentException>(() => this.userService.GetUser(null), "Wrong token");
                Assert.Throws<ArgumentException>(() => this.userService.GetUser(string.Empty), "Wrong token");
            });
        }
    }
}
