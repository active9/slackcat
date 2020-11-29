
# SlackCat

Pipe STDIN To Slack From The Command Line


# Installing

```bash
npm install -g slackcat
```

## Command Line Arguments (optional)
*Output Channel* ( Defaults to general )
```bash
-f general
```

*Bot Name* ( Defaults to Bot )
```bash
-n Bot
```

*Bot Icon* ( Defaults to computer )
```bash
-i :computer:
```

*Bot Silent* ( Defaults to false )
```bash
-s true
```

*Bot Muted* ( Defaults to false )
```bash
-m true
```

## Environment Variables (required)
**REQUIRED**: *Slack API Token* ( see: https://my.slack.com/services/new/bot )
```bash
SLACKCAT_API_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**OPTIONAL**: "Bot Channel"
```bash
SLACKCAT_CHANNEL = general
```

**OPTIONAL**: "Bot Name"
```bash
SLACKCAT_USERNAME = Bot
```

**OPTIONAL**: "Bot Icon"
```bash
SLACKCAT_ICON = :computer:
```

**OPTIONAL**: "Bot Silent"
```bash
SLACKCAT_SILENT = false
```

**OPTIONAL**: "Bot Muted"
```bash
SLACKCAT_MUTED = false
```

## Usage

From The Command Line:

Say Hello Slack World! in the general channel.
```bash
echo "Hello Slack World!" | slackcat
```

Say Welcome To The Channel! in the welcome channel when you run this command

```bash
echo "Welcome To The Channel!" | slackcat -f welcome
```

Use all the command line options to ask Who Wants Cake? in the party channel with the :cake: icon and use the name Chef.

```bash
echo "Who Wants Cake?" | slackcat -f party -i :cake: -n Chef
```

Use the muted command line option to make your bot have an inner thought and not post to slack.

```bash
echo "What Is The Best Way To Slack?" | slackcat -f general -m true
```
## Further Reading

Facts:
- This module is heavily inspired by and loosely based off of the python module slackcat. 
- A 10 second delay occurs before slackcat will exit after the STDIO is closed. This gives the bot time to send the data to slack before exiting.
- Silent mode makes SlackCat not emit to STDOUT.
- Muted mode makes SlackCat not emit to SLACK.
- Feature requests will not be taken but bug related issues will be addressed.
- No cats were harmed in the making of this module.
- Less than 1 cup of coffee and 2 hours of time was used in making this module
- You can run this module with nodejs to output errors to slack. example: node server.js | slackcat
## License
MIT
