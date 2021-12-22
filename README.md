# language-input-ui

This is the frontent code for [https://www.languageinput.com/](https://www.languageinput.com/).

## Installation

- Set up [language-input-api](https://github.com/peterolson/language-input-api) and run on your local machine.
- Clone this repository and run `npm install`
- Create a .env file in the root directory with the following contents:

```
# Required for creating JSON web tokens, can be any string
JWT_SECRET=secret string goes here

# Required for Microsoft Text-to-speech
MICROSOFT_SPEECH_SUBSCRIPTION_KEY=
MICROSOFT_SPEECH_ISSUE_TOKEN_ENDPOINT=
MICROSOFT_SPEECH_REGION=
MICROSOFT_SPEECH_ISSUE_TOKEN_HOST=

# Required for uploading files to an S3 bucket
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_S3_BUCKET=
AWS_S3_UPLOAD_ENDPOINT=
AWS_S3_HOSTING_ENDPOINT=

# Port the server will run on
PORT=3001
```

# Development

- Run `npm run dev` to start the server.
