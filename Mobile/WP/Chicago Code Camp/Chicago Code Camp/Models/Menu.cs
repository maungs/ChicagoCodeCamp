using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chicago_Code_Camp.Models
{
    public class Menu
    {
        public string MenuItem { get; set; }
        private string _menuImg;
        public string menuImg
        {
            set
            {
                _menuImg = value;
            }
            get
            {
                return _menuImg;
            }
        }
        public Uri MenuImg
        {
            get
            {
                return new Uri(_menuImg, UriKind.Relative);
            }
        }
    }
}
