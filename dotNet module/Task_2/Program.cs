using System;

namespace Task_2
{
    public class Program
    {
        public static void Main(string[] args)
        {
            DateTime dateStart;
            DateTime dateEnd;
            DateTime remindTime;
            

            Console.WriteLine("Введите дату начала встречи");
            DateTime.TryParse("03.03.2021 11:00:00", out dateStart);
            Console.WriteLine(dateStart);

            Console.WriteLine("Введите дату окончания встречи");   
            DateTime.TryParse("03.03.2021 12:00:00", out dateEnd);
            Console.WriteLine(dateEnd);

            Console.WriteLine("Введите дату напоминания");
            DateTime.TryParse("03.03.2021 10:30:00", out remindTime);
            Console.WriteLine(remindTime);

            /*Meeting meeting = new Meeting();
            meeting.SetDates(dateStart, dateEnd);
            Console.WriteLine(meeting.DateStart);
            Console.WriteLine(meeting.DateEnd);*/  

            MeetingWithReminding meetingWithReminding = new MeetingWithReminding(dateStart, dateEnd, remindTime);
            meetingWithReminding.Remind += DisplayMessage;      
            Console.ReadKey();

            /// <summary>
            /// Метод DisplayMessage - обработчик события Remind, принимает строку Remind?.Invoke("!!!!!!!!!!!!!!!!!!!").
            /// </summary>
            void DisplayMessage(string message)
            {
                Console.WriteLine(message);               
            }
        }
    }
}
