using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using System.Windows;

namespace WPCordovaClassLib.Cordova.Commands
{
    public class SpinnerDialog : BaseCommand
    {

        private static ProgressIndicator progressIndicator;
        private static PhoneApplicationPage page;

        public void show(string options)
        {

            string[] args = JSON.JsonHelper.Deserialize<string[]>(options);
            string title = args[0];
            string message = args[1];

            if (message == null)
            {
                message = title;
            }

            Deployment.Current.Dispatcher.BeginInvoke(() =>
            {

                if (progressIndicator == null)
                {
                    progressIndicator = new ProgressIndicator() { IsIndeterminate = true };
                }
                progressIndicator.Text = message;
                progressIndicator.IsVisible = true;

                if (page == null)
                {
                    page = (Application.Current.RootVisual as PhoneApplicationFrame).Content as PhoneApplicationPage;
                }

                SystemTray.SetProgressIndicator(page, progressIndicator);

            });

        }

        public void hide(string options)
        {

            if (progressIndicator != null && page != null)
            {
                Deployment.Current.Dispatcher.BeginInvoke(() =>
                {
                    SystemTray.SetProgressIndicator(page, null);
                });
            }

        }

    }
}