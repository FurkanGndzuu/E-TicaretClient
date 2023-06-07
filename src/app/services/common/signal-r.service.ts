import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr/dist/esm/HubConnection';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
private connection : HubConnection;

get Connection() : HubConnection{
  return this.connection;
}

  async start(hubUrl : string){
      if(!this.connection || this.connection?.state == HubConnectionState.Disconnected){
        const builder : HubConnectionBuilder = new HubConnectionBuilder();

        const hubConnection : HubConnection = builder.withUrl(hubUrl).withAutomaticReconnect().build();

        hubConnection.start().then(() => console.log("connected")).catch(error => {
          setTimeout(() => this.start(hubUrl) , 2000);
        })

        this.connection = hubConnection;
      }

      this.connection.onreconnected(connectionId => console.log(connectionId + "baglandi"));
      this.connection.onreconnecting(error => console.log(error));
      this.connection.onclose(error => console.log("closed"));
  }

  invoke(produceName : string ,message :any, errorCallBack : (value) => void , successCallBack : ()=> void){
      this.Connection.invoke(produceName , message).then(successCallBack).catch(errorCallBack)
    }
    on(producerName : string, callBack : (...message) => void){
        this.Connection.on(producerName ,callBack);
    }
}
