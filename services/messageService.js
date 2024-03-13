const Message = require('../models/messageModel');

async function scheduleMessage(message, day, time) {
  try {
    const scheduledTime = new Date(day);
    scheduledTime.setHours(time.getHours());
    scheduledTime.setMinutes(time.getMinutes());

    const newMessage = new Message({
      message: message,
      scheduledTime: scheduledTime
    });

    await newMessage.save();
    return newMessage;
  } catch (error) {
    throw new Error(`Error scheduling message: ${error.message}`);
  }
}

module.exports = {
  scheduleMessage
};
