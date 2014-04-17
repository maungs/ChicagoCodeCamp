using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class ScheduleSessions
    {
        public int SubmissionId { get; set; }
        public int SessionId { get; set; }
        public int RoomId { get; set; }
        public string SecondSpeaker { get; set; }
        public string Track { get; set; }
        public string TrackDescription { get; set; }
        public string Speaker { get; set; }
        public string Title { get; set; }
    }
}
