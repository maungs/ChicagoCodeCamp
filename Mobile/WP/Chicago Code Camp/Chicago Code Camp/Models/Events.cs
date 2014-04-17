using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class Events
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public DateTime EventDate { get; set; }
        public override string ToString()
        {
            return Name;
        }
    }
}
