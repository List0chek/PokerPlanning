using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Task_8
{
    class TextFileBruteForce : IEnumerable<string>
    {
        public List<string> textList = new List<string>();

        public TextFileBruteForce(string path)
        {
            using (StreamReader sr = new StreamReader(path))
            {
                while (!sr.EndOfStream)
                {
                    this.textList.Add(sr.ReadLine());
                }
            }
        }
        
        public IEnumerator<string> GetEnumerator()
        {
            return new TextFileBruteForceEnumerator(this.textList);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this.textList.GetEnumerator();
        }
    }
}
