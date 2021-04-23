const topics = {};

const pubsub = {
  publish(topic, data) {
    if (topics[topic]) {
      topics[topic].forEach((fn) => fn(data));
    }
    return this;
  },

  subscribe(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push(fn);
    return this;
  },

  unsubscribe(topic, fn) {
    topics[topic] = topics[topic].filter((subscriberFn) => subscriberFn !== fn);
    if (topics[topic].length === 0) {
      delete topics[topic];
    }
  },
};

export default pubsub;
