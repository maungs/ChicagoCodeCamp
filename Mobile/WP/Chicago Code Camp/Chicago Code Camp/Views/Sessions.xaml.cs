using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using System.IO.IsolatedStorage;
using System.Net.NetworkInformation;

namespace Chicago_Code_Camp.Views
{
    public partial class Sessions : PhoneApplicationPage
    {

        private IsolatedStorageSettings isoData;
        private List<Models.Sessions> lstSessions;
        private DateTime lastPulled = DateTime.Now.AddDays(-1);
        private string EventId = "5";
        public Sessions()
        {
            InitializeComponent();
        }
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            this.isoData = IsolatedStorageSettings.ApplicationSettings;
            progMain.Visibility = System.Windows.Visibility.Visible;
            progMain.IsIndeterminate = true;
            progMain.IsEnabled = true;
            bool foundEvent = NavigationContext.QueryString.TryGetValue("EventId", out EventId);
            if (foundEvent)
            {
                LoadIsolatedStorage();
            }
        }
        private void LoadIsolatedStorage()
        {
            if (isoData.Contains("lstSessions"))
            {
                lstSessions = (List<Models.Sessions>)isoData["lstSessions"];
                Dispatcher.BeginInvoke(DisplaySessions);
            }
            else
            {
                lstSessions = new List<Models.Sessions>();
                isoData.Add("lstSessions", lstSessions);
            }

            if (isoData.Contains("lastPulledSessions"))
            {
                lastPulled = (DateTime)isoData["lastPulledSessions"];
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable() && lastPulled.AddDays(1) <= DateTime.Now)
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Sessions/" + EventId + "?json=true", UriKind.RelativeOrAbsolute));
            }
        }

        private void DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            if (e.Error != null || e.Cancelled)
            {
                return;
            }

            try
            {
                var myDeserializedObjList = (List<Models.Sessions>)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(List<Models.Sessions>));
                lstSessions = myDeserializedObjList;
                if (!this.isoData.Contains("lastPulledSessions"))
                {
                    this.lastPulled = DateTime.Now;
                    this.isoData.Add("lastPulledSessions", this.lastPulled);
                }
                else
                {
                    this.isoData["lastPulledSessions"] = DateTime.Now;
                }

                this.isoData["lstSessions"] = this.lstSessions;
                this.isoData.Save();
                this.DisplaySessions();
            }
            catch
            {
            }
        }
        private void DisplaySessions()
        {
            lsSessions.ItemsSource = null;
            lsSessions.ItemsSource = lstSessions;
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }

        private void lsSessions_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (lsSessions.SelectedIndex == -1)
                return;
            var Session = ((Models.Sessions)lsSessions.Items[lsSessions.SelectedIndex]).Id.ToString();
            NavigationService.Navigate(new Uri("/Views/Session.xaml?Id=" + Session, UriKind.Relative));

        }
    }
}