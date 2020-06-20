FROM node:12.18.0
WORKDIR /service-front-acamica
COPY package*.json ./
RUN npm install --only=production
COPY . .
CMD [ "npm", "run build " ]
CMD [ "npm", "start" ]
