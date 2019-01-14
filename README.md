# W2D1 breakout: Node API example

# TOPICS:

Focus on:
- callbacks
- scope
- small single-purpose functions
- refactoring some of them into modules
- dotenv
  
Use the `request` npm - library

How to read the docs for and experiment with the GitHub api

How and why you would break things into functions and even modules

Rate limiting and why gh does this

The challenge of putting secret keys into source code, dotenv

LOOK UP NODE GITIGNORE BEST PRACTICES -> FIND A TEMPLATE
An example template: https://github.com/github/gitignore/blob/master/Node.gitignore

Here are a bunch of notes, adapted from Karl Jensen's notes. For Karl's code examples and slides,[see here!](https://github.com/jensen/nodeapp-notes/)

This lesson allows you to see how a developer approaches building a small Node application. The application should access an existing API using the request library. We want to refactor the app so that it follows best practices.

## The ENVironment

Your operating system will run processes within an environment. A user or administrator can set [variables within the environment](https://en.wikipedia.org/wiki/Environment_variable). On a UNIX system these variables can be set using various techniques.

You can list the current environment variables by using the command `export`. One way to set a variable is to use the command `export KEY=VALUE`. This variable will only be set for the terminal session that it executed within.

Another common technique is to set an environment variable when running a process.

`KEY=VALUE node script.js`

### Separating Code and Config

Web applications separate their code and config. I should be able to share the source code, while keeping the configuration of the application separate. Each developer on a team may need to provide a different configuration. It is also common to change the configuration based on the deployment of the application.

### Secrets

Some of the configuration should be kept private. We often need to include secret keys, tokens and passwords in our code. You do not want to publish this confidential information to a publicly accessible server. The separation of code and configuration supports this goal.

### Using the dotenv library

The dotenv library provides a good solution to separating code and config. The [dotenv](https://github.com/motdotla/dotenv) library allows you to create a file named `.env` in the root directory of your project.

__.env__
```
GITHUB_TOKEN=bd04b7dc42d9a29...
```

Now gain access to the GITHUB_TOKEN variable in a node application. It is a good idea to configure dotenv at the top of your file. Once this action is taken, you will have access to the variables defined in `.env`.

```javascript
require('dotenv').config();

const access_token = process.env.GITHUB_TOKEN;
```

### Using .gitignore

Keeping code and configuration separate allows us to hide our configuration while still being able to share the source code. We use a `.gitignore` file to exclude certain files from our version control system.

This means that everyone who wants to run the application would need their own .env file. It's a good idea to create a `.env.example` file that you do commit. This will allow you to inform other developers of the environment variables that have to be set.

__.env.example__
```
GITHUT_TOKEN=
DARKSKY_SK=
IPSTACK_SK=
DB_USERNAME=
DB_PASSWORD=
```

Now a new developer would `cp .env.example .env` and fill in the values with their own credentials. The app would load their .env file and use the variables contained for it's configuration.

## Using the request library

We choose to use the [request library](https://github.com/request/request) instead of nodes `http` library. It provides a more direct interface to make common requests.

### Simple requests

```javascript
request(`https://api.github.com/users/jensen/repos`, function(error, response, body) {
  console.log(body);
});
```

With this example, we make a `GET /users/jensen/repos` request to api.github.com. Once the server returns the response, the request library executes the callback function. The body variable contains [JSON](https://developer.github.com/v3/repos/#response).

### Advanced requests

The request function can also take an object representing the request we want to make. A list of all possible options can be found in the [request documentation](https://github.com/request/request#requestoptions-callback). With this configuation we want to sort the repos starting with the newest. In order to increase the number of calls that can be made, an `access_token` is provided. Since this is a `GET` request we cannot send body data. We use a [query string](https://en.wikipedia.org/wiki/Query_string) to pass data to the server.

First test your request using curl or Postman. This way we can rule out any bugs due to an incorrect request.

Once you have confirmed that the request is well formed, you can translate it into JavaScript code.

```javascript
require('dotenv').config();

request({
  url: `https://api.github.com/users/jensen/repos`,
  qs: {
    sort: 'created',
    direction: 'desc',
    access_token: process.env.GITHUB_TOKEN
  },
  headers: {
    'user-agent': 'node application'
  }
}, function(error, response, body) {
  var repos = JSON.parse(body);

  repos.forEach(function(repo) {
    console.log(repo.name);
  });

  console.log(repos.length + ' repos');
});
```

[Github User-Agent Required](https://developer.github.com/v3/#user-agent-required)

If the `User-Agent` header isn't included then Github will respond with a 403 Forbidden error. Adding it yourself as a header will fix this.

## A Node Application

The requirements for our node application are:

1. Retrieve the _location_ of the address in latitude and longitude.
2. Use the retrieved latitude and longitude to make a request for the _weather_ at that location.

There are many options when it comes choosing an API for common types of data.

This example uses Dark Sky for the weather API and ipstack for the IP Location API. Once you register for an account you are provided with a limited number of requests within a timeframe. This is normal for free accounts. If your app needs more requests you would pay for them.