import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private connectionEstablished = new Subject<boolean>();
  public connectionEstablished$ = this.connectionEstablished.asObservable();

  constructor() {
    this.startConnection();
  }

  private startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44358/BatterySimHub') // replace with your hub URL
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.connectionEstablished.next(true);
      })
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public stopConnection(): void {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
      .catch(err => console.error('Error while stopping connection: ' + err));
  }

  public addListener(methodName: string, callback: (...args: any[]) => void): void {
    this.hubConnection.on(methodName, callback);
  }

  public removeListener(methodName: string): void {
    this.hubConnection.off(methodName);
  }

  public sendMessage(methodName: string, ...args: any[]): Promise<void> {
    return this.hubConnection
      .invoke(methodName, ...args)
      .catch(err => console.error('Error while sending message: ' + err));
  }
}
