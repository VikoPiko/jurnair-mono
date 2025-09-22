Sample working main.go websocket server was made.
no database or data integrity implemented yet due to time constraints 
and scope of project. 

Due to NX not having native support for go modules yet
decision to switch to nestjs service for websocket messaging was made.
future possible migration to GOLang since it offers high concurrency and multithreading.
Since the applications requirements for messaging are low, nestjs should be able to handle the traffic well enough for the application's needs.