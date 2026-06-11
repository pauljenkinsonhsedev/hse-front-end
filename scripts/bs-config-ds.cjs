module.exports = {
  port: 8081,
  startPath: '/designsystem/index.htm',
  open: 'local',
  notify: false,
  ui: false,
  files: ['./designsystem/**/*'],
  watchOptions: {
    ignored: ['node_modules', '.git', '.vscode']
  },
  server: {
    baseDir: './designsystem',
    routes: {
      '/designsystem': './designsystem'
    }
  }
};
