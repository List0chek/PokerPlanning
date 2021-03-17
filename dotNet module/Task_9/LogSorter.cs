using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Task_8;

namespace Task_9
{
    public class LogSorter
    {
        /// <summary>
        /// Метод сортирует записи из лога за определенную дату по времени.
        /// </summary> 
        public static List<string> GetRecordsSorted(string path, DateTime dateStart)
        {
            var textFileBruteForce = new TextFileBruteForce(path);
            int dateLength = "dd.MM.yyyy\tHH:mm:ss".Length;
            DateTime dateTime;

            var scoreQuery = textFileBruteForce.Where(line => DateTime.TryParseExact(line.Substring(0, dateLength), "dd.MM.yyyy\tHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateTime))
                                               .Where(line => DateTime.Parse(line.Substring(0, dateLength)).Date == dateStart.Date)
                                               .OrderBy(line => DateTime.Parse(line.Substring(0, dateLength)));
            return scoreQuery.ToList();
        }
    }
}
