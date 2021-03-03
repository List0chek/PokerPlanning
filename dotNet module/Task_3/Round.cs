using System;
using System.Collections.Generic;
using System.Text;

namespace Task_3
{
    /// <summary>
    /// Класс круг.
    /// </summary>
    public class Round : Circle
    {
        public Round(int x, int y, double r) : base(x, y, r) { }

        public override double SidesLength()
        {
            return 2 * Math.PI * R;
        }

        public override double Area()
        {            
            return Math.PI * R * R;
        }
    }
}
