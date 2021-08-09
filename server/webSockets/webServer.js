const init = (server) => {
  require("express-ws")(server);

  server.ws("/wss", function (ws, req) {
    ws.on("open", function () {
      ws.send("response");
    });
    ws.on("message", function (msg) {
      console.log(JSON.parse(msg));
    });
  });
};

module.exports = init;
