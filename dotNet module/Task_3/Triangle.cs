using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;

namespace Task_3
{
    /// <summary>
    /// Класс треугольник.
    /// </summary>
    public class Triangle : Shape
    {
        public double AB { get; set; }

        public double BC { get; set; }

        public double CA { get; set; }

        public override double SidesLength()
        {
            return AB + BC + CA;
        }

        /// <summary>
        /// Метод находит площадь с помощью формулы Герона.
        /// </summary>
        public override double Area()
        {
            double halfPerimeter = (AB + BC + CA) * 0.5;            
            return Math.Sqrt(halfPerimeter * (halfPerimeter - AB) * (halfPerimeter - BC) * (halfPerimeter - CA));            
        }

        public Triangle(int x, int y, double ab, double bc, double ca) : base(x, y)
        {
            this.AB = ab;
            this.BC = bc;
            this.CA = ca;
        }
    }
}
