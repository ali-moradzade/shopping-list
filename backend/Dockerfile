FROM node

WORKDIR '/usr/app'

COPY package.json .

RUN npm install && npm install -g typescript

COPY . .

CMD ["npm", "run", "start"]
