using System;
using System.Timers;

namespace Task_2
{
    class MeetingWithReminding : Meeting, IRemind
    {
        /// <summary>
        /// Свойство RemindDate.
        /// </summary>
        public TimeSpan RemindDate { get; set; }

        /// <summary>
        /// aTimer - Экземпляр System.Timers.Timer.
        /// </summary>
        private static Timer aTimer;
        ////Timer aTimer = new Timer();

        /// <summary>
        /// Объявление делегата, принимает строку.
        /// </summary>
        public delegate void RemindEventHandler(string msg);

        /// <summary>
        /// Объявление события Remind, которое представляет делегат RemindEventHandler.
        /// </summary>
        public event RemindEventHandler Remind;

        /// <summary>
        /// Конструктор MeetingWithReminding. 
        /// Принимает на вход дату начала и окончания встречи, а также дату напоминания о встрече. 
        /// Вычисляет время до напоминания. Запускает таймер. Каждую минуту таймер обращается к методу Timer_Tick.
        /// </summary>
        public MeetingWithReminding(DateTime dateStart, DateTime dateEnd, DateTime remindTime) 
        {
            RemindDate = remindTime - DateTime.Now;
            aTimer = new Timer();
            aTimer.Interval = 60000;
            aTimer.Elapsed += Timer_Tick;
            aTimer.Start();
        }

        /// <summary>
        /// Метод Timer_Tick - обработчик события Elapsed.       
        /// Если время до напоминания <= 0, то запускает событие Remind (в Remind передается строка, т.к. делегат RemindEventHandler принимает параметр типа string), прекращает вызывать Elapsed. 
        /// Если время до напоминания > 0, то вычитает из времени до напоминания минуту.         
        /// </summary>
        public void Timer_Tick(object source, ElapsedEventArgs e)
        {            
            if (RemindDate <= TimeSpan.Zero)
            {
                Console.WriteLine(RemindDate);
                Remind?.Invoke("!!!!!!!!!!!!!!!!!!!");
                aTimer.Stop(); 
            }
            else if (RemindDate > TimeSpan.Zero)
            {
                RemindDate = RemindDate - TimeSpan.Parse("00:01:00");
                Console.WriteLine(RemindDate);
            }            
        }
    }
}
