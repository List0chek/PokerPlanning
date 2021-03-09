using System;
using System.Collections.Generic;
using System.Text;

namespace Task_2
{
    public class TypeOfMeeting : Meeting
    {
        public enum MeetingType
        {
            Conference,

            Assignment,

            Call,

            BirthDay
        }

        public MeetingType TypeMeeting { get; set; }

        public TypeOfMeeting(DateTime dateStart, DateTime dateEnd, MeetingType typeMeeting) : base(dateStart, dateEnd)
        {
            this.TypeMeeting = typeMeeting;
        }
    }
}
