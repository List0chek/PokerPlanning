using NUnit.Framework;
using System;
using System.IO;
using System.Linq;
using Task_4;
using Task_8;
using Task_12;
using System.Collections.Generic;

namespace DotNetModule.Tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        [TestCase(AccessRightsChecker.AccessRights.AccessDenied | AccessRightsChecker.AccessRights.Add | AccessRightsChecker.AccessRights.Ratify, ExpectedResult = "AccessDenied\r\n")]
        [TestCase(AccessRightsChecker.AccessRights.Add | AccessRightsChecker.AccessRights.Ratify, ExpectedResult = "Add, Ratify\r\n")]
        public string ShowAccessRightsTest(AccessRightsChecker.AccessRights accessRights)
        {
            string allConsoleOutput = string.Empty;
            using (StringWriter stringWriter = new StringWriter())
            {
                Console.SetOut(stringWriter);
                AccessRightsChecker.ShowAccessRights(accessRights);
                allConsoleOutput = stringWriter.ToString();
            }

            return allConsoleOutput;
        }

        [Test]
        public void LoggerTest()
        {
            using (var logger = new Logger("1000nows.txt"))
            {
                for (int i = 0; i < 1000; i++)
                {
                    logger.WriteString(i.ToString());
                }
            }
            Assert.AreEqual(File.ReadAllLines("1000nows.txt").Count(), 1000);
            int counter = 0;
            foreach (var line in File.ReadLines("1000nows.txt"))
            {
                Assert.AreEqual(line, counter.ToString());
                counter++;
            }
            File.Delete("1000nows.txt");
        }

        [Test]
        [TestCase(12, 14, 16, ExpectedResult = 16)]
        [TestCase(12.3, 16.3, 14.3, ExpectedResult = 16.3)]
        public T GetMaxFromThreeElementsTest<T>(T operand1, T operand2, T operand3) where T : IComparable<T>
        {
            return MaxFromThree.GetMaxFromThreeElements(operand1, operand2, operand3);
        }

        [Test]
        public void TextFileReaderTest()
        {
            string path = "TextFileReaderTest.txt";
            string allConsoleOutput = string.Empty;

            using (StringWriter stringWriter = new StringWriter())
            {
                Console.SetOut(stringWriter);
                using (var textFileBruteForce = new TextFileReader(path))
                {
                    foreach (var item in textFileBruteForce)
                    {
                        Console.WriteLine(item);
                    }
                }
                allConsoleOutput = stringWriter.ToString();
            }

            Assert.AreEqual(File.ReadAllText(path), allConsoleOutput);
        }

        [Test]
        public void GetPropertiesInfoTest()
        {
            var example = new Example();
            var properties1 = Exercise1.GetPropertiesInfo(example);
            var properties2 = Exercise2.GetPropertiesInfo("Task_12_orig.dll", "Task_12.Example");
            for (int i = 0; i < properties2.Count; i++)
            {
                Assert.AreEqual(properties2[i], properties1[i]);
            }

            var properties3 = Exercise3.GetPropertiesInfo(example);
            Assert.AreEqual(properties2.Count-2, properties3.Count);
            var testList = new List<string>();
            testList.Add("Property name: DaysInBissextileYear");
            testList.Add("Property value: 366\n");
            Assert.AreEqual(testList, properties2.Except(properties3));
        }
    }
}
