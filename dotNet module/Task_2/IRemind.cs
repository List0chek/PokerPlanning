using System;

namespace Task_2
{
    /// <summary>
    /// Интерфейс IRemind. 
    /// </summary>
    interface IRemind
    {
        /// <summary>
        /// Свойство RemindDate.
        /// </summary>
        public TimeSpan RemindDate { get; set; }
    }
}
