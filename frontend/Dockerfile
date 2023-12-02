FROM node

WORKDIR '/usr/app'

COPY package.json .

EXPOSE 4200
RUN npm install && npm install -g typescript

COPY . .

CMD ["npm", "run", "start"]
