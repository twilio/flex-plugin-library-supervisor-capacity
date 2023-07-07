## Details
#### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- This adds a *Channel Capacity* panel to the Teams view.
- Supervisors may configure each worker's capacity per channel, as well as whether or not a worker is eligible to receive tasks for that channel.
#### Installation
- After installing the plugin, the settings for this plugin are to be set in flex config. Refer [Flex Configuration REST API](https://www.twilio.com/docs/flex/developer/config/flex-configuration-rest-api) docs. 
- Sample payload for setting rules object in flex config, which specifies which channels should be displayed and the allowed capacity range for that channel.
```json
"supervisor_capacity": {
  "rules": {
    "voice": {
      "min": 0,
      "max": 1
    },
    "chat": {
      "min": 0,
      "max": 7
    }
  }
}
```
- **Note** If the `rules`object is present, only the channels specified will be displayed. If the `rules` object is not present, all channels will be displayed.
