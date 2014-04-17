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

        private void MapControl_Loaded(object sender, RoutedEventArgs e)
        {
            Microsoft.Phone.Maps.MapsSettings.ApplicationContext.ApplicationId = "25dd2a23-c301-4336-86f5-1d1d9a25e53e";
            Microsoft.Phone.Maps.MapsSettings.ApplicationContext.AuthenticationToken = "9ybNh2xcCsp_ZqoN_d9cHA";
        }
    }
}