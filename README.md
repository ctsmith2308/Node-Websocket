### Websocket Node Server with Socket.io

Client side intergration with quick `create-react-app` startup

```
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:8080"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("hello", data => {
      this.setState({
        response: data
      });
    });
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <p>Here is the response: {response} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default App;
```