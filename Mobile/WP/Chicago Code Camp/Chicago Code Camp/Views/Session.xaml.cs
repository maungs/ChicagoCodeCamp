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
using System.Windows.Media.Imaging;

namespace Chicago_Code_Camp.Views
{
    public partial class Session : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<Models.Sessions> lstSessions;
        private string SessionId = "1";
        private string SpeakerId = "1";
        private string SecondSpeakerId = "1";
        public Session()
        {
            InitializeComponent();
        }
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            this.isoData = IsolatedStorageSettings.ApplicationSettings;
            progMain.Visibility = System.Windows.Visibility.Visible;
            progMain.IsIndeterminate = true;
            progMain.IsEnabled = true;
            bool foundEvent = NavigationContext.QueryString.TryGetValue("Id", out SessionId);
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
                Dispatcher.BeginInvoke(DisplaySession);
            }
            else
            {
                lstSessions = new List<Models.Sessions>();
                isoData.Add("lstSessions", lstSessions);
            }

            isoData.Save();
            if ((from s in lstSessions where s.Id == Convert.ToInt32(SessionId) select s).ToList().Count == 0)
            {
                if (NetworkInterface.GetIsNetworkAvailable())
                {
                    var wc = new WebClient();
                    wc.DownloadStringCompleted += this.DownloadStringCompleted;
                    wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Session/" + SessionId + "?json=true", UriKind.RelativeOrAbsolute));
                }
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
                var myDeserializedObj= (Models.Sessions)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(Models.Sessions));
                if ((from s in lstSessions where s.Id == Convert.ToInt32(SessionId) select s).ToList().Count == 0)
                {
                    lstSessions.Add(myDeserializedObj);
                    this.isoData["lstSessions"] = this.lstSessions;
                    this.isoData.Save();
                }
                for (int i = 0; i < lstSessions.Count; i++ )
                {
                    Models.Sessions p = lstSessions[i];
                    if (p.Id.ToString() == SessionId)
                    {
                        lstSessions[i] = myDeserializedObj;
                        break;
                    }
                }

                this.DisplaySession();
            }
            catch
            {
            }
        }
        private void DisplaySession()
        {
            if (lstSessions.Count == 0 || lstSessions == null || (from s in lstSessions where s.Id == Convert.ToInt32(SessionId) select s).ToList().Count == 0)
                return;
            foreach (Models.Sessions p in lstSessions)
            {
                if (p.Id.ToString() == SessionId)
                {
                    this.sTitle.Text = p.Title;
                    this.Speaker1.Text = p.SpeakerName;
                    BitmapImage bmp = new BitmapImage();
                    bmp.CreateOptions = BitmapCreateOptions.BackgroundCreation;
                    bmp.UriSource = new Uri(p.SpeakerAvatar, UriKind.RelativeOrAbsolute);
                    this.Avatar1.Source = bmp;
                    this.Speaker2.Text = p.SecondSpeakerName;
                    bmp = new BitmapImage();
                    bmp.CreateOptions = BitmapCreateOptions.BackgroundCreation;
                    bmp.UriSource = new Uri(p.SecondSpeakerAvatar, UriKind.RelativeOrAbsolute);
                    if (p.SecondSpeakerName!=null && p.SecondSpeakerName.Length>0)
                    {
                        Avatar2.Visibility = System.Windows.Visibility.Visible;
                        rectSpeaker2.Visibility = System.Windows.Visibility.Visible;
                        this.Speaker2.Visibility = System.Windows.Visibility.Visible;
                    }
                    this.Avatar2.Source = bmp;
                    this.Abstract.Text = p.Abstract;
                    this.Level.Text = p.Level;
                    this.Keywords.Text = p.keywords;
                    SpeakerId = p.SpeakerId.ToString();
                    SecondSpeakerId = p.SecondSpeakerId.ToString();
                    break;
                }
            }
            stopProgressBar();
        }
        private void stopProgressBar()
        {
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }

        private void Avatar1_Tap(object sender, System.Windows.Input.GestureEventArgs e)
        {
            NavigationService.Navigate(new Uri("/Views/Presenter.xaml?Id=" + SpeakerId, UriKind.Relative));
        }

        private void Avatar2_Tap(object sender, System.Windows.Input.GestureEventArgs e)
        {
            NavigationService.Navigate(new Uri("/Views/Presenter.xaml?Id=" + SecondSpeakerId, UriKind.Relative));
        }


    }
}