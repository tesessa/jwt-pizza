# Incident: YYYY-MM-DD HH-mm-ss

## Summary

> [!NOTE]
> Write a summary of the incident in a few sentences. Include what happened, why, the severity of the incident and how long the impact lasted.

```md
Between the hour of 19:33 UTC and 20:20 UTC on April 8, 2025, 20 users encountered failure to buy a pizza. The event was triggered by an error in the pizza factory fulfilling orders at 13:33. The pizza factory failure contained problems in being able to create JWT pizzas for users.

A bug in this code caused the JWT pizza-facotry to fail at creating pizzas, which made it so when users tried to buy a pizza it said "failed to fulfill order at the facotry". The event was detected by grafana logs and metrics that kept track of pizza failures and unhandled errors. The team started working on the event by looking at the logs and into the code to see how the pizza factory was accessed. This SEV-2 (high) incident affected 100% of users.

There was further impact as noted by 20 errors were raised in relation to this incident.
```

## Detection

> [!NOTE]
> When did the team detect the incident? How did they know it was happening? How could we improve time-to-detection? Consider: How would we have cut that time by half?

```md
This incident was detected when the pizza creation failures alert was triggered and the jwt-pizza on call team (Tessa) were paged.
Tessa was paged and was able to start responding to the incident right away. Through looking at the logs and code she was able to find
where the root problem occurred. She could improve on finding the problem faster by knowing where to look in the logs for more information
and by lowering her alert values so she is alerted sooner. The alerting system will be updated up by Tessa so that errors will be caught and handled earlier.
```

## Impact

> [!NOTE]
> Describe how the incident impacted internal and external users during the incident. Include how many support cases were raised.

```md
For 50 minutes between 19:33 UTC and 20:20 UTC on 04/08/25, there was an issue in being able to buy and create JWT pizzas which our users experienced.

This incident affected 20 customers (100% OF active USERS), who experienced not being able to buy JWT pizzas.

Alerts were triggered and 20 unhandled errors were found.
```

## Timeline

> [!NOTE]
> Detail the incident timeline. We recommend using UTC to standardize for timezones.
> Include any notable lead-up events, any starts of activity, the first known impact, and escalations. Note any decisions or changed made, and when the incident ended, along with any post-impact events of note.

```md
All times are UTC.

- _19:33_ - Error in JWT pizza creations occurred 
- _20:00_ - Upgraded logging reporting of an unhandled error
- _20:20_ - Found error within logging information on grafana and handled it
- _20:22_ - Pizza creation/buying works for all users
```

## Response

> [!NOTE]
> Who responded to the incident? When did they respond, and what did they do? Note any delays or obstacles to responding.

```md
After receiving a page at 19:33 UTC, Tessa came online at 19:40 UTC in Grafana.

Tessa looked closely at the logging and metrics to find more information of the error. She then tried buying a pizza herself and found where the code was failing when buying a pizza. She checked the pizza-factory endpoint then used the explore function on Grafana to see more in detail information on the logs she was receiving. Some obstacles was she was trying to find something wrong with the pizza factory or her code accessing the wrong website instead of looking into the logging information first. 
```

## Root cause

> [!NOTE]
> Note the final root cause of the incident, the thing identified that needs to change in order to prevent this class of incident from happening again.

```md
There was a bug in the authentication of creating pizzas at the pizza-factory, which was hard to detect as the pizza-factory is hidden from view.

```

## Resolution

> [!NOTE]
> Describe how the service was restored and the incident was deemed over. Detail how the service was successfully restored and you knew how what steps you needed to take to recovery.
> Depending on the scenario, consider these questions: How could you improve time to mitigation? How could you have cut that time by half?

```md
By looking at the error reports for the pizza factory there was a url that was returned from the reportPizzaCreationErrorToPizzaFactoryUrl that we accessed that resolved the error and gave us accesss to the factory again.
```

## Prevention

> [!NOTE]
> Now that you know the root cause, can you look back and see any other incidents that could have the same root cause? If yes, note what mitigation was attempted in those incidents and ask why this incident occurred again.

```md
This problem in being able to access creating a pizza at the factory, impacted the full access to the factory, including verifying and buying pizzas.
```

## Action items

> [!NOTE]
> Describe the corrective action ordered to prevent this class of incident in the future. Note who is responsible and when they have to complete the work and where that work is being tracked.

```md
**EXAMPLE**:

1. Lower our alert values for pizza creation failures and logging unhandled errors
2. Tessa is responsible for tracking the pizza-factory access in the future and is expected to handle the error in less than an hour
3. Add more information to the logging so the error is more easily detected and fixed
```
