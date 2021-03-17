using System;
using System.IO;
using System.IO.Compression;
using System.Windows.Forms;
using Task_4;

namespace Task_7
{
    public class GZIPTextReader
    {
        /// <summary>
        /// Метод позволяет загрузить данные из текстового файла, сжатого по методу GZIP.
        /// </summary>
        public static string LoadGZippedText(string filename)
        {
            try
            {
                var richTextBox = new RichTextBox();
                string str = string.Empty;
                using (var sourceStream = new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    using (var uncompressedStream = new GZipStream(sourceStream, CompressionMode.Decompress, true))
                    {
                        using (var textReader = new StreamReader(uncompressedStream, true))
                        {
                            while (!textReader.EndOfStream)
                            {
                                richTextBox.Rtf = textReader.ReadToEnd();
                                str = richTextBox.Rtf;
                            }
                        }
                    }
                }
                return str;
            }
            catch (FileNotFoundException e)
            {
                var ex = new LoadFileException("Файл не был найден", e);
                using (var logger = new Logger("log.log"))
                {
                    logger.WriteString(ex.Message);
                }
                return ex.Message;
            }
            catch (UnauthorizedAccessException e)
            {
                var ex = new LoadFileException("Недостаточно прав доступа", e);
                using (var logger = new Logger("log.log"))
                {
                    logger.WriteString(ex.Message);
                }
                return ex.Message;
            }
        }
    }
}
