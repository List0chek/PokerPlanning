using System;

namespace Task_2
{
    /// <summary>
    /// Класс Meeting. Позволяет установить дату начала и дату окончания встречи, производит расчет длительности встречи. 
    /// </summary>
    class Meeting
    {
        /// <summary>
        /// Свойство DateStart.
        /// </summary>
        public DateTime DateStart { get; set; }

        /// <summary>
        /// Свойство DateEnd.
        /// </summary>
        public DateTime DateEnd { get; set; }

        /// <summary>
        /// Метод MeetingDuration. Производит расчет длительности встречи. 
        /// </summary>
        public TimeSpan MeetingDuration()
        {
            return this.DateEnd - this.DateStart;
        }

        /// <summary>
        /// Метод SetDates. Позволяет установить дату начала и окончания встречи.
        /// </summary>
        public void SetDates(DateTime dateStart, DateTime dateEnd)
        {   
            this.DateStart = dateStart;
            this.DateEnd = dateEnd;
        }
    }
}
