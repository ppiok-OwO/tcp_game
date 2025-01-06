// proto 확장자 파일에 정의된 스키마를 읽어올 때
// js 파일에서 별도로 객체를 만들어서 접근한다.(편의성을 위해)

export const packetNames = {
  common: {
    Packet: 'common.Packet',
    Ping: 'common.Ping',
  },
  initial: {
    InitialPacket: 'initial.InitialPacket',
  },
  game: {
    CreateGamePayload: 'game.CreateGamePayload',
    JoinGamePayload: 'game.JoinGamePayload',
  },
  response: {
    Response: 'response.Response',
  },
};

// type: Packet, InitialPacket, Response
// typeName: common.Packet
