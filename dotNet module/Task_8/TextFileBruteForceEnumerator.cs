using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Task_8
{
    public class TextFileBruteForceEnumerator : IEnumerator<string>
    {
        private int curIndex = -1;

        private string str;

        private StreamReader streamReader;

        public TextFileBruteForceEnumerator(string path)
        {
            this.streamReader = new StreamReader(path);
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
                    return this.str;
                }
                catch (ArgumentOutOfRangeException)
                {
                    throw new InvalidOperationException();
                }
            }

            set
            {
                this.str = value;
            }
        }

        object IEnumerator.Current
        {
            get { return this.str; }
        }

        /// <summary>
        /// Перемещает указатель на след. элемент, делает проверку на окончание листа.
        /// </summary>
        public bool MoveNext()
        {
            if ((this.Current = this.streamReader.ReadLine()) != null)
            {
                return true;
            }
            else
                return false;
        }

        /// <summary>
        /// Сброс указателя.
        /// </summary>
        public void Reset() { this.curIndex = -1; }

        void IDisposable.Dispose() { }
    }
}