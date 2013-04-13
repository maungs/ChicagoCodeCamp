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
    public partial class About : PhoneApplicationPage
    {
        public About()
        {
            InitializeComponent();
            about.Text = "\tChicago Code Camp is a not for profit technical camp created for the developers by the developers. It was founded in 2008 by a handful of developers. The code camp is a free event and everyone is invited to come and participate.\n\tThe camp is technology agnostic and our presenters are typically the best in their field. In the past, we have presenters talked about various mobile platforms, web technologies, desktop applications, and hardware development.\n\tSince the code camp is a free event, we are always on the look out for sponsors. If you or your organization would like to support us, please contact our staff during the code camp. The code camp staff would like to thank all the current sponsors.\n\nThis application is created by Byteables";
        }

        private void Email_Click(object sender, RoutedEventArgs e)
        {
            EmailComposeTask email = new EmailComposeTask();
            email.Subject = "WP: Chicago Code Camp";
            email.To = "development@byteables.com";
            email.Show();
        }
    }
}