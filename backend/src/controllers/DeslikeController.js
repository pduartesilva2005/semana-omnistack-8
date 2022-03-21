const Dev = require('../models/Dev');

module.exports = {
  async store(request, response) {
    const { user } = request.headers;
    const { devId } = request.params;

    const loggedDev = await Dev.findById(user);
    let targetDev = null;

    try {
      targetDev = await Dev.findById(devId);
    } catch (error) {
      return response.status(400).json({ error: 'Dev not exists' });
    }

    loggedDev.deslikes.push(targetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
};
