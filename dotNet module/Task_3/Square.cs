using System;
using System.Collections.Generic;
using System.Text;

namespace Task_3
{
    /// <summary>
    /// Класс квадрат.
    /// </summary>
    public class Square : Shape
    {
        public double SideA { get; set; }

        public override double SidesLength()
        {
            return SideA * 4;
        }

        public override double Area()
        {
            return SideA * SideA;
        }

        public Square(int x, int y, double sideA) : base(x, y)
        {
            this.SideA = sideA;            
        }
    }
}
