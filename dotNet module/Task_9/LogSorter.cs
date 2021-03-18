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
        public static List<string> GetRecordsSorted(string path, DateTime date)
        {
            var textFileBruteForce = new TextFileReader(path);
            const string dateTimeFormat = "dd.MM.yyyy\tHH:mm:ss";
            int dateLength = dateTimeFormat.Length;
            DateTime dateTime;

            var resultQuery = textFileBruteForce
                .Select(line => (line,  isDateTime : DateTime.TryParseExact(line.Substring(0, dateLength), "dd.MM.yyyy\tHH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out dateTime), dateTime))
                .Where(tuple => tuple.dateTime.Date == date.Date)
                .OrderBy(tuple => tuple.dateTime)
                .Select(tuple => tuple.line);
                                                
            return resultQuery.ToList();
        }
    }
}
