using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;
using Microsoft.Phone.Controls;
using Chicago_Code_Camp.Models;
using Newtonsoft.Json;
using System.Net.NetworkInformation;
using System.IO.IsolatedStorage;

namespace Chicago_Code_Camp
{
    public partial class MainPage : PhoneApplicationPage
    {
        private IsolatedStorageSettings isoData;
        private List<Menu> MenuItems;
        private List<Events> lstEvents;
        private DateTime lastPulled = DateTime.Now.AddDays(-0.5);
        // Constructor
        public MainPage()
        {
            InitializeComponent();
            this.Loaded += new RoutedEventHandler(MainPage_Loaded);
        }

        // Handle selection changed on ListBox
        private void MainListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            // If selected index is -1 (no selection) do nothing
            if (MainListBox.SelectedIndex == -1 ||  lpEvents.SelectedIndex == -1)
                return;
            var MenuItem = ((Menu)MainListBox.Items[MainListBox.SelectedIndex]).MenuItem;
            var EventId = ((Events)lpEvents.Items[lpEvents.SelectedIndex]).Id.ToString();
            NavigationService.Navigate(new Uri("/Views/"+MenuItem+".xaml?EventId=" + EventId, UriKind.Relative));

            //// Reset selected index to -1 (no selection)
            MainListBox.SelectedIndex = -1;
            if (lpEvents.Items.Count > 0)
                lpEvents.SelectedIndex = lpEvents.Items.Count - 1;
        }


        private void LoadIsolatedStorage()
        {
            if (isoData.Contains("lstEvents"))
            {
                lstEvents = (List<Events>)isoData["lstEvents"];
                Dispatcher.BeginInvoke(BindEventList);
            }
            else
            {
                lstEvents = new List<Events>();
                isoData.Add("lstEvents", lstEvents);
            }

            if (isoData.Contains("lastPulled"))
            {
                lastPulled = (DateTime)isoData["lastPulled"];
            }

            isoData.Save();

            if (NetworkInterface.GetIsNetworkAvailable() && lastPulled.AddDays(.5) <= DateTime.Now)
            {
                var wc = new WebClient();
                wc.DownloadStringCompleted += this.DownloadStringCompleted;
                wc.DownloadStringAsync(new Uri("http://www.chicagocodecamp.com/api/Events?json=true", UriKind.RelativeOrAbsolute));
            }
        }
        // Load data for the ViewModel Items
        private void MainPage_Loaded(object sender, RoutedEventArgs e)
        {
            this.isoData = IsolatedStorageSettings.ApplicationSettings;
            MenuItems = new List<Menu>();
            MenuItems.Add(new Menu { MenuItem = "Schedule", menuImg = "/Images/mainpage/icon_Schedule.png" });
            MenuItems.Add(new Menu { MenuItem = "Sessions", menuImg = "/Images/mainpage/icon_Sessions.png" });
            MenuItems.Add(new Menu { MenuItem = "Presenters", menuImg = "/Images/mainpage/icon_Presenter.png" });
            MenuItems.Add(new Menu { MenuItem = "Sponsors", menuImg = "/Images/mainpage/icon_Sponsors.png" });
            MenuItems.Add(new Menu { MenuItem = "Location", menuImg = "/Images/mainpage/icon_Map.png" });
            MenuItems.Add(new Menu { MenuItem = "About", menuImg = "/Images/mainpage/icon_CCC.png" });
            MainListBox.ItemsSource = MenuItems;
            progMain.Visibility = System.Windows.Visibility.Visible;
            progMain.IsIndeterminate = true;
            progMain.IsEnabled = true;
            LoadIsolatedStorage();
            
        }

        private void DownloadStringCompleted(object sender, DownloadStringCompletedEventArgs e)
        {
            if (e.Error != null || e.Cancelled)
            {
                return;
            }

            try
            {
                var myDeserializedObjList = (List<Events>)Newtonsoft.Json.JsonConvert.DeserializeObject(e.Result, typeof(List<Events>));
                lstEvents = myDeserializedObjList;
                if (!this.isoData.Contains("lastPulled"))
                {
                    this.lastPulled = DateTime.Now;
                    this.isoData.Add("lastPulled", this.lastPulled);
                }
                else
                {
                    this.isoData["lastPulled"] = DateTime.Now;
                }

                this.isoData["lstEvents"] = this.lstEvents;
                this.isoData.Save();
                this.BindEventList();
            }
            catch
            {
            }
        }
        private void BindEventList()
        {
            lpEvents.ItemsSource = null;
            lpEvents.ItemsSource = lstEvents;
            if(lpEvents.Items.Count>0)
                lpEvents.SelectedIndex = lpEvents.Items.Count - 1;
            progMain.Visibility = System.Windows.Visibility.Collapsed;
            progMain.IsIndeterminate = false;
            progMain.IsEnabled = false;
        }
    }
}