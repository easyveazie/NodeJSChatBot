FROM node:latest

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY src /app

# You only need this for the bot Emulator. The bot does not need inbound ports when using in Teams/Slack.
# EXPOSE 3978 80

CMD [ "node", "app.js" ]