using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task_4;

namespace Task_7
{
    [Serializable]
    public class LoadFileException : Exception
    {
        public LoadFileException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
