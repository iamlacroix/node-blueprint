/*
 * notify
 */

module.exports = {

  options: {
    platform: 'notification-center'
  },

  assets: {
    options: {
      title: 'Observing Assets',
      message: 'Assets compiled, watching for changes',
    }
  },

  compile: {
    options: {
      title: 'Assets Updated',
      message: 'All assets have been compiled',
    }
  },

  stylesheets: {
    options: {
      title: 'Stylesheets Updated',
      message: 'Stylesheets have been compiled'
    }
  },

  javascripts: {
    options: {
      title: 'JavaScripts Updated',
      message: 'JavaScripts have been compiled'
    }
  },

  node_jshint: {
    options: {
      title: 'Node.js Linted',
      message: 'Node.js files have been linted'
    }
  },

  static_assets: {
    options: {
      title: 'Static Assets Updated',
      message: 'Static assets have changed'
    }
  },

  nodemon: {
    options: {
      title: 'Sever Started',
      message: 'Development server started, will restart on changes'
    }
  },

  test: {
    options: {
      title: 'Tests Complete',
      message: 'Development server started, will restart on changes'
    }
  },

  generic_tasks: {
    options: {
      title: 'Tasks Complete',
      message: 'All tasks have properly finished'
    }
  }

};
