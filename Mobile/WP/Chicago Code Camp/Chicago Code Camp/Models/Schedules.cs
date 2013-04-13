using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class Schedules
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string StartsAt { get; set; }
        public string EndsAt { get; set; }
        public List<ScheduleSessions> Sessions { get; set; }
        public string SessionName
        {
            get
            {
                return Name + " @ " + StartsAt + " - " + EndsAt;
            }
        }
    }
}
