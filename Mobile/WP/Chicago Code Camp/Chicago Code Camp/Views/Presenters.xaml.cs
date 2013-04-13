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
using Chicago_Code_Camp.Models;
using System.Net.NetworkInformation;

namespace Chicago_Code_Camp.Views
{
    public partial class Presenters : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<Models.Presenter> lstPresenters;
        private DateTime lastPulled = DateTime.Now.AddDays(-1);
        private string EventId = "5";
        public Presenters()
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
            if (isoData.Contains("lstPresenters"))
            {
                lstPresenters = (List<Models.Presenter>)isoData["lstPresenters"];
                Dispatcher.BeginInvoke(DisplayPresenters);
            }
            else
            {
                lstPresenters = new List<Models.Presenter>();
                isoData.Add("lstPresenters", lstPresenters);
            }

            if (isoData.Contains("lastPulledPresenters"))
            {
                lastPulled = (DateTime)isoData["lastPulledPresenters"];
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable() && lastPulled.AddDays(1) <= DateTime.Now)
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Presenters/" + EventId + "?json=true", UriKind.RelativeOrAbsolute));
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
                var myDeserializedObjList = (List<Models.Presenter>)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(List<Models.Presenter>));
                lstPresenters = myDeserializedObjList;
                if (!this.isoData.Contains("lastPulledPresenters"))
                {
                    this.lastPulled = DateTime.Now;
                    this.isoData.Add("lastPulledPresenters", this.lastPulled);
                }
                else
                {
                    this.isoData["lastPulledPresenters"] = DateTime.Now;
                }

                this.isoData["lstPresenters"] = this.lstPresenters;
                this.isoData.Save();
                this.DisplayPresenters();
            }
            catch
            {
            }
        }
        private void DisplayPresenters()
        {
            lsPresenters.ItemsSource = null;
            lsPresenters.ItemsSource = lstPresenters;
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }

        private void lsPresenters_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (lsPresenters.SelectedIndex == -1)
                return;
            var Presenter = ((Models.Presenter)lsPresenters.Items[lsPresenters.SelectedIndex]).Id.ToString();
            NavigationService.Navigate(new Uri("/Views/Presenter.xaml?Id=" + Presenter, UriKind.Relative));
            lsPresenters.SelectedIndex = -1;

        }

    }
}