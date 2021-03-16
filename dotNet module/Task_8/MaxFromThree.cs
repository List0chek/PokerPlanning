using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Task_8
{
    public class MaxFromThree 
    {
        /// <summary>
        /// Возвращает максимальное из трех значение generic типа.
        /// </summary>
        public static T GetMaxFromThreeElements<T>(T operand1, T operand2, T operand3) where T : IComparable<T>
        {
            List<T> list = new List<T> { operand1, operand2, operand3 };
            return list.Max();
        }
    }
}
