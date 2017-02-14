const setting = {
    name: 'main',
    host: 'ds011442.mlab.com',
    port: 11442,
    user: 'OjyyRJZk',
    password: '2D86VZgQ'
};

const url = `mongodb://${setting.user}:${setting.password}@${setting.host}:${setting.port}/${setting.name}`;

module.exports = url;