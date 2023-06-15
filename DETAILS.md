## Details

### How it works
Plugin is ready to use once it is installed and the browser window is refreshed.
- Implements a Channel Capacity panel in the [Twilio Flex Teams View](https://flex.twilio.com/teams/)
- Supervisors may configure each worker's capacity per channel, as well as whether or not a worker is eligible to receive tasks for that channel.
- Optionally, we may also include a `rules` object in the feature configuration. Within the rules object, you may specify which channels should be displayed, and the allowed capacity range for that channel. If the rules object is present, only the channels specified will be displayed. If the rules object is not present, all channels will be displayed.
Here is an example configuration with rules:

```
    "ui_attributes": {
        "custom_data": {
            "features": {
                "supervisor_capacity": {
                    "rules": {
                        "voice": {
                            "max": 1,
                            "min": 0
                        },
                        "chat": {
                            "max": 7,
                            "min": 0
                        }
                    }
                }
            }
        }
    }
```

### Installation
During installation, 1 field is required:

 1. *TaskRouter Workspace SID*: This is the SID of the "Flex Task Assignment" workspace that you see in [Twilio Console > TaskRouter > Workspaces](https://console.twilio.com/us1/develop/taskrouter/workspaces).Please refer screenshot below:
 ![Workspace Sid example](https://raw.githubusercontent.com/twilio/flex-plugin-library-chat-transfer/main/screenshots/workspace_sid_help.png)