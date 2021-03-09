using System;

namespace Task_4
{
    public class Program
    {
        public static void Main(string[] args)
        {
            /// <summary>
            /// Пример использования класса DataSetSeparation.
            /// </summary>
            DataSetSeparation.GetExampleOfDataSetSeparation();

            /// <summary>
            /// Пример использования класса AccessRightsClass.
            /// </summary>
            AccessRightsClass.ShowAccessRightsClassExample();
            Console.WriteLine();

            /// <summary>
            /// Пример использования класса DateAndRealNumbersFormatting.
            /// </summary>
            DateAndRealNumbersFormatting.GetExampleOfDateFormatting();
            DateAndRealNumbersFormatting.GetExampleOfRealNumberFormatting();

            /// <summary>
            /// Пример использования класса Logger.
            /// </summary>
            using (var logger = new Logger(@"F:\Intel\1000nows.txt"))
            {
                for (int i = 0; i < 1000; i++)
                {
                    logger.WriteString(DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss"));
                }
            }
            Console.WriteLine();

            /// <summary>
            /// Пример использования класса StringConcatAnalyze.
            /// </summary>
            StringConcatAnalyze.StringConcatAnalyzeExmaple();
        }
    }
}
