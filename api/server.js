const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    // සරලව සිංහලෙන් රිප්ලයි හදමු
    let reply = "මම සරල චැට්බොට් කෙනෙක්. ඔයා කිව්වේ: '" + message + "'";
    
    // හෙලෝ කිව්වොත් වෙනස් රිප්ලයි එකක් දෙමු
    if (message.toString().toLowerCase().includes('hello') || message.toString().includes('හෙලෝ')) {
        reply = 'හෙලෝ! කොහොමද ඉතින්?';
    }

    ws.send(reply);
  });

  ws.send('චැට් කරන්න පටන් ගන්න පුළුවන්!');
});

console.log('Server started');
