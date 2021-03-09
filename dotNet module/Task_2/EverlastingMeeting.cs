using System;
using System.Collections.Generic;
using System.Text;

namespace Task_2
{
    public class EverlastingMeeting : Meeting
    {
        public EverlastingMeeting(DateTime dateStart) : base(dateStart, DateTime.MaxValue) { }
        
        
    }
}
