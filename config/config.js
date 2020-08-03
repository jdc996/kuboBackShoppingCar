module.exports = function configSetup() {
    // istanbul ignore next
    return {
      'db': {
        'connectionString': process.env.MONGO_URL || ""
      },
    };
  };