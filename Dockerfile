FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN yarn install

# Copy the app's source code to the container
COPY . .

# Build the app
RUN yarn run build

# Set the environment variables
ENV NODE_ENV production

# Expose the port that the app listens on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]