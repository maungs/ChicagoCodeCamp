using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class Presenter
    {
        private string _AvatarURL;
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Speaker
        {
            get
            {
                return FirstName + " " + LastName;
            }
        }
        public string AvatarURL {
            get
            {
                return _AvatarURL;
            }
            set
            {
                _AvatarURL = value;
            }
        }
        public string Website { get; set; }
        public string Biography { get; set; }
        public string Twitter { get; set; }
        public string SpeakerRate { get; set; }
        public string LinkedIn { get; set; }
        public string Facebook { get; set; }
        public Uri Avatar
        {
            get
            {
                return new Uri(_AvatarURL, UriKind.RelativeOrAbsolute);
            }
        }
        public System.Windows.Visibility TwitterShow
        {
            get
            {
                if (Twitter != null && Twitter.Length > 0)
                    return System.Windows.Visibility.Visible;
                else
                    return System.Windows.Visibility.Collapsed;
            }
        }
        public System.Windows.Visibility WebSiteShow
        {
            get
            {
                if (Website != null && Website.Length > 0)
                    return System.Windows.Visibility.Visible;
                else
                    return System.Windows.Visibility.Collapsed;
            }
        }
    }
}
