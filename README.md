# WebViewer - Sharepoint integration sample
## Prerequisites
  - (Optional but recommended) [Node Version Manager](http://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
  - Set up on Windows environment highly recommended

## For step-by-step help on setting up a SharePoint development environment, see one of the following:

[Sharepoint Extension](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/building-simple-cmdset-with-dialog-api)
[Set up your Microsoft 365 Tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
[Set up your SharePoint Framework Development Environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment)

### Initial Setup
  1. Ensure that custom scripts are [enabled on your tenant](https://docs.microsoft.com/en-us/sharepoint/allow-or-prevent-custom-script#to-allow-custom-script-on-other-sharepoint-sites). If you have [SharePoint Online Management Shell](https://docs.microsoft.com/en-us/powershell/sharepoint/sharepoint-online/connect-sharepoint-online?view=sharepoint-ps) installed you can run this command to enable custom scripts on your tenant.

       `Set-SPOsite <SiteURL> -DenyAddAndCustomizePages 0`

  2. Ensure you disable your custom App Authentication so that you can use sharepoint rest api

       `set-spotenant -DisableCustomAppAuthentication $false`

  3. To get your access token, you need to [Register SharePoint Add-ins](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/register-sharepoint-add-ins) 

  4. Also you need to [Granting access using SharePoint App-Only](https://docs.microsoft.com/en-us/sharepoint/dev/solution-guidance/security-apponly-azureacs) or you can check out this [youtube channel](https://www.youtube.com/watch?v=YMliU4vB_YM&t=631s) to get your **client_id**, **client_secret**, and **tenant_info**

  5. To get your **tenant_id**, you can checkout this [link](https://piyushksingh.com/2017/03/06/get-office-365-tenant-id/)

  6. There are lots of ways to get your **absolute_url**, in your **ECBLab** project, you can `console.log(this.context.pageContext)` to find your absolute_url in ExportToDocCommandSet.ts file.

  7. After get all information we want, we can easily set each of your projects up.

  8. Firstly, let's open webViewer-react-sample project, create .env in your root folder and set each following variables:
      - REACT_APP_CLIENT_ID
      - REACT_APP_CLIENT_SECRET
      - REACT_APP_RESOURCE
      - `REACT_APP_GRANT_TYPE = client_credentials`
      - REACT_APP_TENANT_ID
      - REACT_APP_ABSOLUTE_URL
  
  9. npm instal and npm start

  10. Now You have your webviewer sample run, you can set your sharepoint extension up. Open the project **ecbLab**.

  11. Firstly, you need to set up the webviewer url in *ExportToDocCommandSet.ts* file
  	`const pdftronUrl = 'http://localhost:3000'`

  12. Secondly, you need to set **pageUrl** in *config/serve.json*, which is your doucment folder in sharepoint. It's just for demo.

  13. Finally, run `gulp serve` to get the app running






