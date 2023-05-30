This is the repository for the website of the association "Myceliums".

# Create the .env file ...

... and copy the content of .env.example in it.

# Start Prisma and the Database

To do so, run "yarn serve".
This command will set a local database running on your machine.
To work on any other database, please fill the connection string in the .env file.

In a new terminal run "yarn set-prisma"
This command will format the database and create the tables according to the models in prisma/schema.prisma.

Please do not run this command if you have already created some data in your database, as it will erase everything.
You can use it on the lokal database, but not on the production one.

# Open a new console and check if everything works !

Launch the application with "yarn run dev"