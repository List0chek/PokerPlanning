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
            if (obj is null)
            {
                return false;
            }
            StringValue stringValue = obj as StringValue;
            if (stringValue is null)
            {
                return false;
            }
            else
            {
                return Equals(stringValue);
            }
        }

        /// <summary>
        /// Метод сравнения. Если ссылки равны, то возвращаем true.  
        /// </summary> 
        public bool Equals(StringValue other)
        {
            if (other is null || this.Value is null)
            {
                return false;
            }
            if (this.Value.Equals(other.Value))
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
            if (this.Value is null)
            {
                return base.GetHashCode();
            }
            return this.Value.GetHashCode();
        }

        public static bool operator ==(StringValue leftValue, StringValue rightValue)
        {
            if (leftValue is null || rightValue is null)
            {
                return false;
            }
            return Equals(rightValue, leftValue);
        }

        public static bool operator !=(StringValue leftValue, StringValue rightValue)
        {
            if (leftValue is null || rightValue is null)
            {
                return false;
            }
            return !Equals(rightValue, leftValue);
        }
    }
}