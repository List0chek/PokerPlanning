using System.IO;
using System.IO.Compression;
using System.Windows.Forms;

namespace Task_7
{
    public class GZIPTextReader
    {
        /// <summary>
        /// Метод позволяет загрузить данные из текстового файла, сжатого по методу GZIP.
        /// </summary>
        public static void LoadGZippedText(string filename, RichTextBox edit)
        {
            using (var sourceStream = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read))

            using (var uncompressedStream = new GZipStream(sourceStream, CompressionMode.Decompress, true))

            using (var textReader = new StreamReader(uncompressedStream, true))

            edit.Rtf = textReader.ReadToEnd();
        }
    }
}
