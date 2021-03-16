using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Task_8
{
    public class TextFileBruteForceEnumerator : IEnumerator<string>
    {
        private int curIndex = -1;

        public List<string> collection = new List<string>();

        
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
            get { return Current; }
        }

        /// <summary>
        /// Перемещает указатель на след. элемент, делает проверку на окончание листа.
        /// </summary>
        public bool MoveNext()
        {
            this.curIndex++;
            if (this.curIndex >= collection.Count)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Сброс указателя.
        /// </summary>
        public void Reset() { curIndex = -1; }

        void IDisposable.Dispose() { }
    }
}

