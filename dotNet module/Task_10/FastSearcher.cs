using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Task_10
{
    public class FastSearcher
    {
        /// <summary>
        /// Максимальное кол-во параллельных задач.        
        /// </summary>
        public int maxQuantityTasks;

        /// <summary>
        /// Минимальное кол-во значений обрабатываемых в одной задаче.        
        /// </summary>
        public int minQuantityValues;

        /// <summary>
        /// Коллекция, в которой происходит поиск по заданному условию.        
        /// </summary>
        private List<int> collection;

        /// <summary>
        /// Делегат condition. С помощью него передается условие поиска по коллекции.        
        /// </summary>
        Predicate<int> condition;

        /// <summary>
        /// Чтобы задать maxQuantityTasks и при этом оставить стандартное значение minQuantityValues, нужно воспользоваться именованными параметрами.        
        /// </summary>
        public FastSearcher(List<int> collection, Predicate<int> predicate, int minQuantityValues = 700000, int maxQuantityTasks = -1)
        {
            this.condition = predicate;
            this.maxQuantityTasks = maxQuantityTasks;
            this.minQuantityValues = minQuantityValues;
            this.collection = collection;
        }

        /// <summary>
        /// Метод выполняет поиск в коллекции значений согласно заданному условию. Условие передается с помощью делегата.
        /// Кол-во задач формируется в зависимости от заданного кол-ва значений обрабатываемых в одной задаче.
        /// Если количество задач задано в конструкторе, то метод создаст кол-во потоков на основе введенного значения. 
        /// Стандартные значения: maxQuantityTasks = -1, minQuantityValues = 700000.  
        /// Стандартное значение minQuantityValues было выбрано в результате проведенных тестов. При значениях < ~700000 однопоток работает быстрее.
        /// </summary>
        public ConcurrentBag<int> DoComputation()
        {
            var result = new ConcurrentBag<int>();
            double diff = (double)collection.Count / minQuantityValues;

            if (diff <= 1 && maxQuantityTasks == -1)
            {
                maxQuantityTasks = 1;
            }
            else if (diff > 1 && maxQuantityTasks == -1)
            {
                maxQuantityTasks = Convert.ToInt32(Math.Round(diff, MidpointRounding.ToPositiveInfinity));
            }

            Parallel.ForEach(collection, new ParallelOptions { MaxDegreeOfParallelism = maxQuantityTasks },
                item =>
                {
                    if (condition(item))
                    {
                        result.Add(item);
                    }
                });
            return result;
        }
    }
}
