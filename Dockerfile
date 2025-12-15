FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

# Expose the port the app runs on
EXPOSE 8000

CMD ["npm", "start"]
