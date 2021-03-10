using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace Task_5
{
    /// <summary>
    /// Для реализации сравнения используем интерфейс IEquatable.
    /// </summary> 
    public class StringValue : IEquatable<StringValue>
    {
        public string Value { get; private set; }

        public StringValue(string value)
        {
            this.Value = value;
        }

        public override bool Equals(object obj)
        {
            return Equals(obj as StringValue);
        }

        /// <summary>
        /// Метод сравнения. Если ссылки равны, то возвращаем true.  
        /// </summary> 
        public bool Equals(StringValue other)
        {
            if (other.GetHashCode() == this.GetHashCode())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Переопределяем метод. Для сравнения нужно, чтобы ссылки совпадали. 
        /// </summary> 
        public override int GetHashCode()
        {
            return HashCode.Combine(this.Value);
        }

        public static bool operator ==(StringValue leftValue, StringValue rightValue)
        {
            if (leftValue.GetHashCode() == rightValue.GetHashCode())
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public static bool operator !=(StringValue leftValue, StringValue rightValue)
        {
            if (leftValue.GetHashCode() == rightValue.GetHashCode())
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}