# Twitch Bonus Channel Point Claimer

This is a tool for the lazy people who don't want to click on the button every 15 minutes to get some additional Channel Points.

Currently the only supported Browser is [Chrome](https://www.google.com/intl/en_us/chrome/).

## Requirements

Since the Tool is written in JavaScript, [Node.js](https://nodejs.org/en/) is required to run the application.

For the tool to be able to interact with the Browser a WebDriver is required. In the case of Chrome this is [ChromeDriver](https://chromedriver.chromium.org/).

For instructions on how to set up ChromeDriver, check out their [documentiation](https://chromedriver.chromium.org/getting-started). However since this tool is written in JavaScript the only option to install it is adding ChromeDriver to your PATH environment variable.


## Configuration

The Configuration of this tool is done via environment variables.

To set up those, create a `.env` file in the root directory of the tool.

The following variables are necessary to run the tool 

| Variable | type | Meaning |
|:--- |:---:| ---:|
| TWITCH_URL | string | The full URL of the Twitch stream you would like to watch. |
| TWITCH_USERNAME |  string | The username of the account you would like to watch the stream with and have bonus Channel Points rewarded to. |
| TWITCH_PASS |  string | The password of the account you would like to watch the stream with and have bonus Channel Points rewarded to. |

## Usage

First install all the `node-modules` required by executing the command

```
npm install
```

Once everything is installed all that's left is starting up the tool by executing 

```
node script.js
```
Since Windows likes to handle file names differently it is more reliable to write `node s` and then press the `TAB` key.
