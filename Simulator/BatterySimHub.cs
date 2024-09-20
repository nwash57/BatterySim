namespace Simulator;

using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class BatterySimHub : Hub
{
  // Send a message to all connected clients
  public async Task SendMessage(string user, string message)
  {
    await Clients.All.SendAsync("ReceiveMessage", user, message);
  }

  // A client can override this method to handle when they connect
  public override async Task OnConnectedAsync()
  {
    await Clients.Caller.SendAsync("ReceiveMessage", "System", "You are connected!");
    await base.OnConnectedAsync();
  }

  // A client can override this method to handle when they disconnect
  public override async Task OnDisconnectedAsync(Exception exception)
  {
    await Clients.All.SendAsync("ReceiveMessage", "System", "A user has disconnected.");
    await base.OnDisconnectedAsync(exception);
  }
}

