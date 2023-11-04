import * as Ably from 'ably';

let options: Ably.Types.ClientOptions = { key: 'foo' };
let client = new Ably.Realtime(options); /* inferred type Ably.Realtime */
let channel = client.channels.get('feed'); /* inferred type Ably.Types.RealtimeChannel */