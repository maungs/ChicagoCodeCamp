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
using System.Windows.Media.Imaging;

namespace Chicago_Code_Camp.Views
{
    public partial class Presenter : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<Models.Presenter> lstPresenters;
        private string PresenterId = "1";
        public Presenter()
        {
            InitializeComponent();
        }
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            this.isoData = IsolatedStorageSettings.ApplicationSettings;
            progMain.Visibility = System.Windows.Visibility.Visible;
            progMain.IsIndeterminate = true;
            progMain.IsEnabled = true;
            bool foundEvent = NavigationContext.QueryString.TryGetValue("Id", out PresenterId);
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
                Dispatcher.BeginInvoke(DisplayPresenter);
            }
            else
            {
                lstPresenters = new List<Models.Presenter>();
                isoData.Add("lstPresenters", lstPresenters);
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable())
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Presenter/" + PresenterId + "?json=true", UriKind.RelativeOrAbsolute));
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
                var myDeserializedObj= (Models.Presenter)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(Models.Presenter));
                if ((from s in lstPresenters where s.Id == Convert.ToInt32(PresenterId) select s).ToList().Count == 0)
                {
                    lstPresenters.Add(myDeserializedObj);
                }
                for (int i = 0; i < lstPresenters.Count; i++ )
                {
                    Models.Presenter p = lstPresenters[i];
                    if (p.Id.ToString() == PresenterId)
                    {
                        lstPresenters[i] = myDeserializedObj;
                        break;
                    }
                }

                this.isoData["lstPresenters"] = this.lstPresenters;
                this.isoData.Save();
                this.DisplayPresenter();
                stopProgressBar();
            }
            catch
            {
            }
        }
        private void DisplayPresenter()
        {
            if (lstPresenters.Count == 0 || lstPresenters == null)
                return;
            foreach (Models.Presenter p in lstPresenters)
            {
                if (p.Id.ToString() == PresenterId)
                {
                    FirstName.Text = p.FirstName;
                    LastName.Text = p.LastName;
                    Twitter.Text = p.Twitter;
                    Website.Text = p.Website;
                    TwitterImg.Visibility = p.TwitterShow;
                    Twitter.Visibility = p.TwitterShow;
                    Website.Visibility = p.WebSiteShow;
                    Uri uri = p.Avatar;
                    BitmapImage bmp = new BitmapImage();
                    bmp.CreateOptions = BitmapCreateOptions.BackgroundCreation;
                    bmp.UriSource = uri;
                    Avatar.Source = bmp;
                    Bio.Text = p.Biography;
                    break;
                }
            }
        }
        private void stopProgressBar()
        {
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }


    }
}