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
using System.Windows.Media;
using Chicago_Code_Camp.Helpers;
using System.Windows.Shapes;

namespace Chicago_Code_Camp.Views
{
    public partial class Schedule : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<Models.Schedules> lstSchedule;
        private DateTime lastPulled = DateTime.Now.AddDays(-.25);
        private string EventId = "5";
        public Schedule()
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
            if (isoData.Contains("lstSchedule"))
            {
                lstSchedule = (List<Models.Schedules>)isoData["lstSchedule"];
                Dispatcher.BeginInvoke(DisplayPresenters);
            }
            else
            {
                lstSchedule = new List<Models.Schedules>();
                isoData.Add("lstSchedule", lstSchedule);
            }

            if (isoData.Contains("lastPulledSchedule"))
            {
                lastPulled = (DateTime)isoData["lastPulledSchedule"];
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable() && lastPulled.AddDays(.25) <= DateTime.Now)
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Schedules/" + EventId + "?json=true", UriKind.RelativeOrAbsolute));
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
                var myDeserializedObjList = (List<Models.Schedules>)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(List<Models.Schedules>));
                lstSchedule = myDeserializedObjList;
                if (!this.isoData.Contains("lastPulledSchedule"))
                {
                    this.lastPulled = DateTime.Now;
                    this.isoData.Add("lastPulledSchedule", this.lastPulled);
                }
                else
                {
                    this.isoData["lastPulledSchedule"] = DateTime.Now;
                }

                this.isoData["lstSchedule"] = this.lstSchedule;
                this.isoData.Save();
                this.DisplayPresenters();
            }
            catch
            {
            }
        }
        private void DisplayPresenters()
        {
            foreach (Models.Schedules s in lstSchedule)
            {
                Grid sess = new Grid();
                sess.Width = 460.00;
                sess.Height = 60.00;
                sess.Margin = new Thickness(-2, 0, 0, 20);
                sess.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                sess.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                sess.Background = new SolidColorBrush(new ReturnColor().getDigitalColors("ff800000"));
                TextBlock x = new TextBlock();
                x.Height = 40.00;
                x.Text = s.SessionName;
                x.FontSize = 26;
                x.TextAlignment = TextAlignment.Center;
                x.Foreground = new SolidColorBrush(Colors.White);
                sess.Children.Add(x);
                x.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                x.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                lsSchedule.Items.Add(sess);
                foreach (Models.ScheduleSessions ss in s.Sessions)
                {
                    Grid ssGrid = new Grid();
                    ssGrid.Width = 460.00;
                    ssGrid.Height = 120.00;
                    ssGrid.Margin = new Thickness(0, 0, 0, 20);
                    ssGrid.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                    ssGrid.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                    ssGrid.Tag = ss.SubmissionId;
                    Grid ssBorder = new Grid();
                    ssBorder.Width = 456.00;
                    ssBorder.Height = 120.00;
                    ssBorder.Margin = new Thickness(1, -2, 2, 2);
                    ssBorder.HorizontalAlignment = System.Windows.HorizontalAlignment.Center;
                    ssBorder.VerticalAlignment = System.Windows.VerticalAlignment.Center;
                    ssBorder.Background = new SolidColorBrush(Colors.Black);
                    StackPanel sPan = new StackPanel();
                    sPan.Width = 456.00;
                    sPan.Height = 120.00;
                    sPan.Margin = new Thickness(1, 1, 1, 1);
                    sPan.Background = new SolidColorBrush(Colors.White);
                    Rectangle rectTitle = new Rectangle();
                    rectTitle.Fill = new SolidColorBrush(new ReturnColor().getDigitalColors("ff7e8083"));
                    rectTitle.Height = 34.00;
                    sPan.Children.Add(rectTitle);
                    TextBlock ssText = new TextBlock();
                    ssText.Height = 34.00;
                    ssText.Text = ss.Title;
                    ssText.FontSize = 26;
                    ssText.Margin = new Thickness(0, -34, 0, 0);
                    ssText.TextAlignment = TextAlignment.Left;
                    ssText.Foreground = new SolidColorBrush(Colors.White);
                    ssText.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    ssText.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                    sPan.Children.Add(ssText);
                    ssText = new TextBlock();
                    ssText.Height =32.00;
                    ssText.Text = ss.Speaker + (ss.SecondSpeaker != null && ss.SecondSpeaker.Length > 0 ? " & " + ss.SecondSpeaker : "");
                    ssText.FontSize = 24;
                    ssText.Margin = new Thickness(0, 5, 0, 0);
                    ssText.TextAlignment = TextAlignment.Left;
                    ssText.Foreground = new SolidColorBrush(Colors.Black);
                    ssText.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    ssText.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                    sPan.Children.Add(ssText);
                    ssText = new TextBlock();
                    ssText.Height = 32.00;
                    ssText.Text = ss.Track;
                    ssText.FontSize = 24;
                    ssText.Margin = new Thickness(0, 5, 0, 0);
                    ssText.TextAlignment = TextAlignment.Left;
                    ssText.Foreground = new SolidColorBrush(Colors.Black);
                    ssText.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    ssText.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                    sPan.Children.Add(ssText);
                    ssBorder.Children.Add(sPan);
                    ssGrid.Children.Add(ssBorder);
                    //TextBlock ssText = new TextBlock();
                    //ssText.Height = 40.00;
                    //ssText.Text = ss.Title;
                    //ssText.FontSize = 26;
                    //ssText.TextAlignment = TextAlignment.Left;
                    //ssText.Foreground = new SolidColorBrush(Colors.White);
                    //ssGrid.Children.Add(ssText);
                    //ssText.HorizontalAlignment = System.Windows.HorizontalAlignment.Left;
                    //ssText.VerticalAlignment = System.Windows.VerticalAlignment.Top;
                    lsSchedule.Items.Add(ssGrid);
                }
            }
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }

        private void lsSchedule_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (lsSchedule.SelectedIndex == -1)
                return;
            if (lsSchedule.SelectedItem.GetType() == new Grid().GetType())
            {
                var selectedItem = ((Grid)lsSchedule.Items[lsSchedule.SelectedIndex]).Tag;
                if(selectedItem != null)
                    NavigationService.Navigate(new Uri("/Views/Session.xaml?Id=" + selectedItem.ToString(), UriKind.Relative));
            }
            lsSchedule.SelectedIndex = -1;
        }
    }
}