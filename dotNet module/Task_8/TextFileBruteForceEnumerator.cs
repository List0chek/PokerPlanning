using System;
using System.Collections;
using System.Collections.Generic;

namespace Task_8
{
    public class TextFileBruteForceEnumerator : IEnumerator<string>
    {
        private int curIndex = -1;

        private List<string> collection = new List<string>();


        public TextFileBruteForceEnumerator(List<string> collection)
        {
            this.collection = collection;
        }

        /// <summary>
        /// Возвращает текущий эелемент.
        /// </summary>
        public string Current
        {
            get
            {
                try
                {
                    return this.collection[this.curIndex];
                }
                catch (ArgumentOutOfRangeException)
                {
                    throw new InvalidOperationException();
                }
            }
        }

        object IEnumerator.Current
        {
            get { return this.Current; }
        }

        /// <summary>
        /// Перемещает указатель на след. элемент, делает проверку на окончание листа.
        /// </summary>
        public bool MoveNext()
        {
            this.curIndex++;
            if (this.curIndex >= this.collection.Count)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Сброс указателя.
        /// </summary>
        public void Reset() { this.curIndex = -1; }

        void IDisposable.Dispose() { }
    }
}