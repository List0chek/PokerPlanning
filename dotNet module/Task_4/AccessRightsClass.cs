using System;
using System.Collections.Generic;
using System.Text;

namespace Task_4
{
    public class AccessRightsClass
    {
        /// <summary>
        /// Метод ShowAccessRightsClassExample. 
        /// </summary>
        public static void ShowAccessRightsClassExample()
        {
            List<byte> rightsListExample = new List<byte>();
            rightsListExample.Add(1);
            rightsListExample.Add(2);
            rightsListExample.Add(4);
            rightsListExample.Add(8);
            // rightsListExample.Add(64);
            rightsListExample.Add(16);
            rightsListExample.Add(32);

            ShowAccessRights(rightsListExample);
        }

        public AccessRights AccessRight { get; set; }

        /// <summary>
        /// Метод для проверки прав.
        /// Сначала проходит по всем правилам для поиска 64 правила, если оно есть, то флаг isUserAccess выставляется в false и метод останавливается при проверке флага.
        /// Если 64 правила найдено не было, то isUserAccess остается true и выводятся все правила из листа с правилами.
        /// </summary>
        public static void ShowAccessRights(List<byte> rightsList)
        {
            bool isUserAccess = true;
            foreach (var right in rightsList)
            {
                if (right == (byte)AccessRights.AccessDenied & (isUserAccess == true))
                {
                    Console.WriteLine("Доступ запрещен");
                    isUserAccess = false;
                }
            }

            if (isUserAccess == true)
            {
                foreach (var right in rightsList)
                {
                    if (right == (byte)AccessRights.View)
                    {
                        Console.WriteLine("Разрешен просмотр");
                    }
                    else if (right == (byte)AccessRights.Run)
                    {
                        Console.WriteLine("Разрешен запуск");
                    }
                    else if (right == (byte)AccessRights.Add)
                    {
                        Console.WriteLine("Разрешено добавление");
                    }
                    else if (right == (byte)AccessRights.Edit)
                    {
                        Console.WriteLine("Разрешено изменение");
                    }
                    else if (right == (byte)AccessRights.Ratify)
                    {
                        Console.WriteLine("Разрешено утверждение");
                    }
                    else if (right == (byte)AccessRights.Delete)
                    {
                        Console.WriteLine("Разрешено удаление");
                    }
                }
            }
        }


        /// <summary>
        /// Тип прав.
        /// </summary>
        [Flags, Serializable]
        public enum AccessRights : byte
        {
            /// <summary>
            /// Просмотр.
            /// </summary>
            View = 1,

            /// <summary>
            /// Выполнение.
            /// </summary>
            Run = 2,

            /// <summary>
            /// Добавление.
            /// </summary>
            Add = 4,

            /// <summary>
            /// Изменение.
            /// </summary>
            Edit = 8,

            /// <summary>
            /// Утверждение.
            /// </summary>
            Ratify = 16,

            /// <summary>
            /// Удаление.
            /// </summary>
            Delete = 32,

            /// <summary>
            /// Нет доступа.
            /// </summary>
            /// <remarks>
            /// Этот флаг имеет максимальный приоритет.
            /// Если он установлен, остальные флаги игнорируются 
            /// </remarks>
            AccessDenied = 64
        }
    }
}
