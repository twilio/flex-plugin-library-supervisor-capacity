## version 1.0.1

Introduced the usage of flex-ui-telemetry package instead of individual classes.

## version 1.0.0

Supervisors may configure each worker's capacity per channel, as well as whether or not a worker is eligible to receive tasks for that channel. Optionally, we may also include a `rules` object in the feature configuration. Within the rules object, you may specify which channels should be displayed, and the allowed capacity range for that channel. If the rules object is present, only the channels specified will be displayed. If the rules object is not present, all channels will be displayed.