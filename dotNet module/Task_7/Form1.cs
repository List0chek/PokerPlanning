using System;
using System.IO;
using System.Windows.Forms;

namespace Task_7
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private string defaultPath = "q2.rtf.gz";

        private void GetTextButton_Click(object sender, EventArgs e)
        {
            OpenFileDialog opfd = new OpenFileDialog();
            if (File.Exists(defaultPath))
            {
                GZIPTextReader.LoadGZippedText(defaultPath, richTextBox1);
            }
            else if (opfd.ShowDialog() == DialogResult.OK)
            {
                GZIPTextReader.LoadGZippedText(opfd.FileName, richTextBox1);
            }
        }
    }
}