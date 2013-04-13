using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class SponsorshipLevels
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int SponsorshipLevelId { get; set; }
        public string ThemeColor { get; set; }
        public List<sponsors> sponsors { get; set; }
    }
}
