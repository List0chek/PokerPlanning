using System;

namespace Task_6
{
    public class Program
    {
        public static void Main(string[] args)
        {
            string path = "ClientConnectionLog.log";
            DateTime dateStart;
            DateTime dateEnd;

            DateTime.TryParse("12.12.2007	13:38:09", out dateStart);
            Console.WriteLine("DateStart: {0}", dateStart);
            DateTime.TryParse("13.12.2007 12:09:32", out dateEnd);
            Console.WriteLine("DateEnd:   {0}", dateEnd);
            Console.WriteLine();

            Console.WriteLine(LogParser.GetRecordsQuantity(path, dateStart, dateEnd));
            Console.WriteLine();

            LogParser logParser = new LogParser();
            Console.WriteLine("Преобразование экземпляра класса в строку: {0}", logParser.ToString());
        }
    }
}
