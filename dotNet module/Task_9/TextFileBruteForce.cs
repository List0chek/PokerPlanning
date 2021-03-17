using System;
using System.Collections;
using System.Collections.Generic;

namespace Task_8
{
    public class TextFileBruteForce : IEnumerable<string>, IDisposable
    {
        private string path;

        public TextFileBruteForce(string path)
        {
            this.path = path;
        }

        public IEnumerator<string> GetEnumerator()
        {
            return new TextFileBruteForceEnumerator(this.path);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }

        // Этот код добавлен для правильной реализации шаблона высвобождаемого класса.
        public void Dispose()
        {
        }
    }
}
