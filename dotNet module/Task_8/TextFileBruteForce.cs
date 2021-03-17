using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Task_8
{
    public class TextFileBruteForce : IEnumerable<string>, IDisposable
    {
        private List<string> textList = new List<string>();
        private int counter = -1;

        private StreamReader sr;

        public TextFileBruteForce(string path)
        {
            this.sr = new StreamReader(path);
        }

        public string GetString()
        {
            this.textList.Add(this.sr.ReadLine());
            this.counter++;
            return this.textList[this.counter];
        }

        public IEnumerator<string> GetEnumerator()
        {
            return new TextFileBruteForceEnumerator(this.textList);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.textList.GetEnumerator();
        }


        private bool disposedValue = false; // Для определения избыточных вызовов

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposedValue)
            {
                if (disposing)
                {
                    this.sr.Dispose();
                }
                this.disposedValue = true;
            }
        }

        // Этот код добавлен для правильной реализации шаблона высвобождаемого класса.
        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
