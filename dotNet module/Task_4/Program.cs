using System;
using System.Collections.Generic;

namespace Task_4
{
    public class Program
    {
        public static void Main(string[] args)
        {
            
            DataSetSeparation.GetExampleOfDataSetSeparation();
            
            ShowAccessRightsClassExample();
            Console.WriteLine();
            
            DateAndRealNumbersFormatter.GetExampleOfDateFormatting(); 
            DateAndRealNumbersFormatter.GetExampleOfRealNumberFormatting();
            
            using (var logger = new Logger("1000nows.txt")) // Пример использования класса Logger.
            {
                for (int i = 0; i < 1000; i++)
                {
                    logger.WriteString(DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss"));
                }
            }
            Console.WriteLine();

            StringConcatAnalyzer.StringConcatAnalyzeExmaple(); 
        }
        public static void ShowAccessRightsClassExample()
        {
            AccessRightsChecker.ShowAccessRights(AccessRightsChecker.AccessRights.AccessDenied | AccessRightsChecker.AccessRights.Add | AccessRightsChecker.AccessRights.Ratify);
            AccessRightsChecker.ShowAccessRights(AccessRightsChecker.AccessRights.Add | AccessRightsChecker.AccessRights.Ratify);
        }
    }
}
