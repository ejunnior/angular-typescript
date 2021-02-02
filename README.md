#### Angula/Typescript Demo App

1. Install Docker Desktop for Mac or Docker CE for Windows from https://docker.com.
1. Clone the repository
1. docker build -f " <your-path>\.docker\portal.dev.dockerfile" --force-rm -t angular-typescript  .
1. docker run -d -p 4201:80 angular-typescript
1. Visit http://localhost:4201 in a browser
