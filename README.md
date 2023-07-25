# Directory Structure

project-name/\
├── assets/\
│ ├── images/\
│ ├── fonts/\
│ └── ...\
├── components/\
│ ├── common/\
│ ├── loaders/\
│ │ └── ProgressBar.tsx\
│ ├── screens/\
│ └── ...\
├── navigation/\
│ ├── AppNavigator.tsx\
│ └── ...\
├── screens/\
│ ├── HomeScreen.tsx\
│ ├── ProfileScreen.tsx\
│ └── ...\
├── services/\
│ ├── api.ts\
│ ├── auth.ts\
│ └── ...\
├── utils/\
│ ├── helpers.ts\
│ ├── constants.ts\
│ └── useLoadingProgress.ts\
├── App.tsx\
├── package.json\
├── yarn.lock (or package-lock.json)\
└── ...\

$ watchman watch-del-all\
$ watchman shutdown-server

metro-file-map: Watchman crawl failed. Retrying once with node crawler.
Usually this happens when watchman isn't running. Create an empty `.watchmanconfig` file in your project's root folder or initialize a git or hg repository in your project.
Error: Watchman error: class watchman::QueryExecError: query failed: synchronization failed: syncToNow: timed out waiting for cookie file to be observed by watcher within 60000 milliseconds: timed out. Make sure watchman is running for this project. See https://facebook.github.io/watchman/docs/troubleshooting.
