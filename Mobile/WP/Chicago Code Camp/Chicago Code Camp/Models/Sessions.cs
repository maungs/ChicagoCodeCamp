using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class Sessions
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int SpeakerId { get; set; }
        public string SpeakerName { get; set; }
        public string SpeakerAvatar { get; set; }
        public int SecondSpeakerId { get; set; }
        public string SecondSpeakerName { get; set; }
        public string SecondSpeakerAvatar { get; set; }
        public string Level { get; set; }
        public int Order { get; set; }
        public string SessionTime { get; set; }
        public string Abstract { get; set; }
        public string keywords { get; set; }
        public bool isCanceled { get; set; }
        public string LevelDisplay
        {
            get
            {
                if (Level != null)
                    return Level.Length > 0 ? "Level: " + Level : "";
                else
                    return "";
            }
        }
        public string KeywordsDisplay
        {
            get
            {
                if (keywords != null)
                    return keywords.Length > 0 ? "Keywords: " + keywords : "";
                else
                    return "";
            }
        }
    }
}
