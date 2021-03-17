using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace Task_8
{
    public class TextFileBruteForce : IEnumerable<string>, IDisposable
    {
        private string path;

        private StreamReader sr;

        public TextFileBruteForce(string path)
        {
            this.path = path;
            this.sr = new StreamReader(path);
        }

        public IEnumerator<string> GetEnumerator()
        {
            return new TextFileBruteForceEnumerator(this.path);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
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
