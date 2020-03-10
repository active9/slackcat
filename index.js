var readline = require('readline');
var SlackBot = require('slackbots');
var argv = require('yargs').argv;
var channel = 'general';
var botname = 'Bot';
var icon = ':computer:';
var outputBuffer = [];

// ARGV Channel (-f)
if (argv.f && argv.f != '') {
    channel = process.env.SLACKCAT_CHANNEL || botname;
}

// ARGV Bot Name (-n)
if (argv.n && argv.n != '') {
    botname = argv.n;
} else {
    botname = process.env.SLACKCAT_USERNAME || botname;
}

// ARGV Bot Emoticon Icon (-i)
if (argv.i && argv.i != '') {
    icon = argv.i;
} else {
    icon = process.env.SLACKCAT_ICON || icon;
}

// Slack Params
var params = {
    icon_emoji: icon
};

// Missing Token?
if (!process.env.SLACKCAT_API_TOKEN || process.env.SLACKCAT_API_TOKEN == '') {
    console.log('Error: Please set your SLACKCAT_API_TOKEN environment variable. See: https://my.slack.com/services/new/bot');
    process.exit(1);
}

// Create A Bot
var bot = new SlackBot({
    token: process.env.SLACKCAT_API_TOKEN, // Token from https://my.slack.com/services/new/bot
    name: botname
});

// Object Push Prototype
Object.defineProperty(outputBuffer, "push", {
    enumerable: false, // hide from for...in
    configurable: false, // prevent further meddling...
    writable: false, // see above ^
    value: function () {
        for (var i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {
            bot.postMessageToChannel(channel, arguments[i], params);
            outputBuffer.pop();
        }
        return n;
    }
});

try {
    // Hook STDIN
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    // Line Out
    rl.on('line', function(line) {
        outputBuffer.push(line);
    });

    // Watch For STDIO close and wait 10 seconds before closing
    rl.on('close', function() {
        setTimeout(function() {
            process.exit(1);
        }, 10000);
    });
} catch (err) {
    console.log('SlackCat Readline Error:', err);
    setTimeout(function() {
        process.exit(1);
    }, 10000);
}

bot.on('start', function() {

    // Output The First Buffer
    outputBuffer.forEach(function(element) {
        console.log('element', channel, element, params);
        bot.postMessageToChannel(channel, element, params);
    });
    outputBuffer.pop();
});
