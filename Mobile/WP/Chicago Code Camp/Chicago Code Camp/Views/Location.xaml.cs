using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using Microsoft.Phone.Tasks;

namespace Chicago_Code_Camp.Views
{
    public partial class Location : PhoneApplicationPage
    {
        public Location()
        {
            InitializeComponent();
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {

            BingMapsTask bingTask = new BingMapsTask();
            bingTask.SearchTerm = "19351 West Washington Street, Grayslake, IL 60030-1198";
            bingTask.Show();
        }
    }
}