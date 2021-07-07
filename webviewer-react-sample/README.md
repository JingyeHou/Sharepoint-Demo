# WebViewer - React sample

[WebViewer](https://www.pdftron.com/documentation/web/) is a powerful JavaScript-based PDF Library that's part of the [PDFTron PDF SDK](https://www.pdftron.com). It provides a slick out-of-the-box responsive UI that interacts with the core library to view, annotate and manipulate PDFs that can be embedded into any web project.

![WebViewer UI](https://www.pdftron.com/downloads/pl/webviewer-ui.png)

This repo is specifically designed for any users interested in integrating WebViewer into React project. You can watch [a video here](https://youtu.be/bVhWXuLSL0k) to help you get started.

## Initial setup

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/en/).

You need to create your own .env file in the root folder, should be in the same location with the src folder. And set follow variable to complete the configuration.
You can get some information in https://docs.microsoft.com/en-us/graph/auth-v2-user and there is also link to set up the rest full api in sharepoint https://www.youtube.com/watch?v=YMliU4vB_YM&t=631s

ACT_APP_CLIENT_ID
REACT_APP_CLIENT_SECRET
REACT_APP_RESOURCE
REACT_APP_GRANT_TYPE
REACT_APP_TENANT_ID
REACT_APP_ABSOLUTE_URL

## Install

```
git clone https://github.com/PDFTron/webviewer-react-sample.git
cd webviewer-react-sample
npm install
```

## Run

```
npm start
```

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory. See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

To test the build directory locally you can use [serve](https://www.npmjs.com/package/serve) or [http-server](https://www.npmjs.com/package/http-server). In case of serve, by default it strips the .html extension stripped from paths. We added serve.json configuration to disable cleanUrls option.

## WebViewer APIs

See [API documentation](https://www.pdftron.com/documentation/web/guides/ui/apis).

## Contributing

See [contributing](./CONTRIBUTING.md).

## License

See [license](./LICENSE).
![](https://onepixel.pdftron.com/webviewer-react-sample)
