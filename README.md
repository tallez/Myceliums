This is an extension for the Alex agcty great Advanced Next Starter Template.
https://github.com/agcty

# Almost there ...

To improve the full stack part a of Alex's template further, this extension integrate Prisma and provide the guideline to easily create and connect a Postgres database.
Also, Next-Auth is implemented to secure your application and Docker is ready to help you deploy everywhere !

REQUIREMENT : Docker must be installed and running on your machine.

First, clone the repository and install the dependencies with "yarn install" in the console from the root folder.

# Create the .env file ...

... and copy the content of .env.example in it.
For the Google Authentication, you should create the credentials of your application in Google.
Please feel free to change

- Google Cloud Console : https://console.cloud.google.com/
- Create a New Project or use an existing one
- Copy and Paste the ID and the SECRET key

You will have to go through the same process with other providers if you want to add yours.
If you want to add other providers like Facebook or Instagram, have a look here : https://next-auth.js.org/providers/.

# Start Prisma and the Database

To do so, run "yarn serve".
In a new terminal run "yarn set-prisma"

# Open a new console and check if everything works !

Launch the application with "yarn run dev".
The frame on the top right corner should be pinkish. :)
That means that the database is up and running for your application.

# Check the Authentication with NextAuth

Click the blueish frame under the pinkish one, and try registering with Google.
If everything went well, you should be back to the home screen with both frame pinkish. :)

# IMPORTANT TIPS:

Don't forget that if you want to make changes to your database models (and you will), this happens in prisma/shema.prisma.
When you are ready to implement the changes, start by running 'yarn serve'. Then open another terminal and run again 'yarn set-prisma'.

Et voilà !

# Issues :

Let me know if you have any problem by posting an issue in the repository and, try to be as detailed as possible !
