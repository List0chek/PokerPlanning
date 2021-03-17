using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Task_8
{
    public class TextFileBruteForceEnumerator : IEnumerator<string>, IDisposable
    {
        private StreamReader streamReader;

        public TextFileBruteForceEnumerator(string path)
        {
            this.streamReader = new StreamReader(path);
        }

        /// <summary>
        /// Возвращает текущий эелемент.
        /// </summary>
        public string Current { get; set; }

        object IEnumerator.Current
        {
            get { return this.Current; }
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
            return false;
        }

        /// <summary>
        /// Сброс указателя.
        /// </summary>
        public void Reset() { }

        void IDisposable.Dispose()
        {
            ((IDisposable)streamReader).Dispose();
        }
    }
}