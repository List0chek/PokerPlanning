using PlanPoker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlanPoker.DTO.Converters
{
    public class UserDTOConverter
    {
        public UserDTO Convert(User user)
        {
            return new UserDTO()
            {
                Id = user.Id,
                Name = user.Name,
                Token = user.Token
            };
        }
    }
}
