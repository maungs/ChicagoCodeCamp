using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;


namespace Chicago_Code_Camp.Helpers
{
    public class ReturnColor
    {
        public Color getDigitalColors(string selectedColor)
        {
            var currentColor = new Color();
            currentColor = Colors.White;
            try
            {
                currentColor = Color.FromArgb(Convert.ToByte(selectedColor.Substring(0, 2), 16),
                                             Convert.ToByte(selectedColor.Substring(2, 2), 16),
                                             Convert.ToByte(selectedColor.Substring(4, 2), 16),
                                             Convert.ToByte(selectedColor.Substring(6, 2), 16));
            }
            catch 
            {
            }

            return currentColor;
        }

    }
}
