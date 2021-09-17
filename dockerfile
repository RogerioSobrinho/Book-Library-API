FROM node:14.17.5

# Create Directory for the Container
WORKDIR /usr/src/app

# Copy files to work directory
COPY . .

# Install all Packages and build app
RUN npm install --quiet && \
    npm run test:coverage && \
    npm run build

# If you are building your code for production
# RUN npm ci --only=production

# check files list
RUN ls -a

EXPOSE 3000

# Start
CMD [ "npm", "start" ]
