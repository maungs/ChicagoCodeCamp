using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using Chicago_Code_Camp.Models;
using Chicago_Code_Camp.Helpers;
using Newtonsoft.Json;
using System.Net.NetworkInformation;
using System.IO.IsolatedStorage;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace Chicago_Code_Camp.Views
{
    public partial class Sponsors : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<SponsorshipLevels> lstSponsors;
        private DateTime lastPulled = DateTime.Now.AddDays(-1);
        private string EventId = "5";
        public Sponsors()
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
            if (isoData.Contains("lstSponsors"))
            {
                lstSponsors = (List<SponsorshipLevels>)isoData["lstSponsors"];
                Dispatcher.BeginInvoke(DisplaySponsors);
            }
            else
            {
                lstSponsors = new List<SponsorshipLevels>();
                isoData.Add("lstSponsors", lstSponsors);
            }

            if (isoData.Contains("lastPulledSponsors"))
            {
                lastPulled = (DateTime)isoData["lastPulledSponsors"];
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable() && lastPulled.AddDays(1) <= DateTime.Now)
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Sponsors/" + EventId+ "?json=true", UriKind.RelativeOrAbsolute));
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
                var myDeserializedObjList = (List<SponsorshipLevels>)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(List<SponsorshipLevels>));
                lstSponsors = myDeserializedObjList;
                if (!this.isoData.Contains("lastPulledSponsors"))
                {
                    this.lastPulled = DateTime.Now;
                    this.isoData.Add("lastPulledSponsors", this.lastPulled);
                }
                else
                {
                    this.isoData["lastPulledSponsors"] = DateTime.Now;
                }

                this.isoData["lstSponsors"] = this.lstSponsors;
                this.isoData.Save();
                this.DisplaySponsors();
            }
            catch
            {
            }
        }
        private void DisplaySponsors()
        {
            foreach (SponsorshipLevels l in lstSponsors)
            {
                Grid gSponsor = new Grid();
                gSponsor.Width = 460.00;
                gSponsor.Height = 60.00;
                gSponsor.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                gSponsor.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                gSponsor.Background = new SolidColorBrush(new ReturnColor().getDigitalColors("ff"+l.ThemeColor.Replace("#", "").ToLower()));
                TextBlock x = new TextBlock();
                x.Height = 40.00;
                x.Text = l.Name;
                x.FontSize = 32;
                x.TextAlignment = TextAlignment.Center;
                x.Foreground = new SolidColorBrush(Colors.Black);
                gSponsor.Children.Add(x);
                x.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                x.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                lsSponsors.Items.Add(gSponsor);
                foreach (sponsors s in l.sponsors)
                {
                    Image articleImage = new Image();
                    articleImage.Stretch = Stretch.Uniform;
                    articleImage.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                    articleImage.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    Uri uri = new Uri(s.LogoLink, UriKind.Absolute);
                    BitmapImage bmp = new BitmapImage();
                    bmp.CreateOptions = BitmapCreateOptions.BackgroundCreation;
                    bmp.UriSource = uri;
                    articleImage.CacheMode = new BitmapCache();
                    articleImage.Source = bmp;
                    articleImage.Margin = new Thickness(0, 0, 0, 8);
                    articleImage.Height = 306.66;
                    articleImage.Width = 460.00;
                    lsSponsors.Items.Add(articleImage);
                }
            }
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }
    }
}