
/** 
 * Battle Commnunication Protocol Controller 
 * @author Juan Sebastian Arboleda <4lzeck@gmail.com>
 */ 


class BCPController {

    /**
     * Creates a new websocket to communicate with server 
     * @param {string} username player's username
     * @param {json} team JSON to be stringified containing the player's team
     * @param {function} msgreceiver callbackfunction
     */
    constructor(username, team, msgreceiver) {

        var x = new WebSocket('ws://' + window.location.hostname + '/wss');
        this.conn = x;
        this.username = username;
        this.conn.onopen = function (e) {
            console.log("Connection established!");
            var toSend = { type: "new", value: { sender: username, team: team } };
            x.send(JSON.stringify(toSend));
            console.log("sending " + JSON.stringify(toSend));
        };
        this.conn.onmessage = function (e) {
            console.log(e.data);
            msgreceiver(e.data);
        };
        this.conn.onerror = function (e) {
            console.log(e);
            return fetch("/lib/html/servizioNonDisponibile.html")
                .then(response => {
                    return response.text()
                })
                .then(data => {
                    document.body.innerHTML = data;
                }).then(
                    () => {
                        return fetch("/lib/js/navbar.js");
                    }
                ).then(response => {
                    return response.text()
                })
                .then(data => {
                    eval(data);
                });
        };
        this.conn.onclose = function (e) {
            console.log(e);
            return fetch("/lib/html/servizioNonDisponibile.html")
                .then(response => {
                    return response.text()
                })
                .then(data => {
                    document.body.innerHTML = data;
                }).then(
                    () => {
                        return fetch("/lib/js/navbar.js");
                    }
                ).then(response => {
                    return response.text()
                })
                .then(data => {
                    eval(data);
                });
        };


    }

    /**
     * Base Protocol Encapsulator 
     * !DO NOT USE  
     * @param {string} type 
     * @param {string} value 
     */
    send(type, value) {
        var toSend = { type: type, value: value };
        this.conn.send(JSON.stringify(toSend));
        console.log("sending " + JSON.stringify(toSend));
    }

    cancel() {
        this.send("cancel", "");
    }

    /**
     * Sends the request to the destination
     * Can be used for rematch instances 
     * @param {string} dest rival's username
     */
    sendRequest(dest) {
        this.send("request", { sender: this.username, destination: dest })
    }

    /**
     * Sends the requesto to create a new battle with a CPU
     * @param {JSON} cpuTeam JSON containing the CPU's team
     */
    startCPU(cpuTeam) {
        this.send("CPU", { sender: "CPU", team: cpuTeam })
    }

    /**
     * Sends the Accept answer to the rival
     * Can be used for rematch instances 
     * @param {string} dest rival's username who challenged the player to battle 
     */
    sendAccept(dest) {
        this.send("accept", { sender: this.username, destination: dest })
    }

    /**
     * Sends the Refuse answer to the rival
     * Can be used for rematch instances 
     * @param {string} dest rival's username who challenged the player to battle 
     */
    sendRefuse(dest) {
        this.send("refuse", { sender: this.username, destination: dest })
    }

    /**
     * Player's battle messages incapsulator for WSB protocol 
     * @param {json} msg JSON to be read by the battle server
     */
    sendBattleMessage(msg) {
        this.send("battle", { sender: this.username, battleInfo: msg })
    }

    /**
     * CPU's battle messages incapsulator for WSB protocol
     * @param {json} msg JSON to be read by the battle server
     */
    sendBattleCPUMessage(msg) {
        this.send("battle", { sender: "CPU", battleInfo: msg })
    }


}
