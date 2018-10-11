---

# NOTE - this project has been moved [here](https://github.com/SkyNorth/NodeJSChatBot)

---

Sample NodeJS bot using Microsoft Bot Framework v3.

<img src="https://bots.botframework.com/Client/Images/bot-framework-default-7.png" width="100" height="100" >

## Overview

This bot is designed to run on Linux in a Docker container. It uses the Bot Builder SDK for Node.js and shows how to use basic functionality of a chat bot. It can be added to Microsoft Teams, Slack, or a web application. To test the sample bot, I recommend you use the [Bot Framework Emulator]('https://github.com/Microsoft/BotFramework-Emulator/releases'). 

## Quickstart
### Requirements
* [Docker](https://www.docker.com/products/docker-desktop)
* [Bot Registration](https://dev.botframework.com/bots/new)
* [Bot Framework Emulator](https://github.com/Microsoft/BotFramework-Emulator/releases)


## Usage
#### Clone repo
``` 
$ git clone https://github.com/easyveazie/NodeJSChatBot.git
```

#### Create .env file in src folder and populate with app ID and Password
```
MicrosoftAppId=<myAppIDGuid>
MicrosoftAppPassword=<myAppPassword>
```

#### Build and run in Docker

```
cd <path to project root>
docker build -t "nodejssamplebot" .
docker run -p 3978:3978 "nodejssamplebot"
```

#### Connect with Bot Framework Emulator and test!
