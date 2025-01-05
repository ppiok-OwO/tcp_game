import { config } from '../../config/config.js';
import { getProtoMessages } from '../../init/loadProtos.js';
import { getNextSequence } from '../../session/user.session.js';
import { PACKET_TYPE } from '../../constants/header.js';

// response를 생성한다.
export const createResponse = (
  handlerId,
  responseCode,
  data = null,
  userId,
) => {
  const protoMessages = getProtoMessages();
  // 정의된 스키마들 중에서 response.Response라는 typeName을 가진 스키마를 불러온다.
  const Response = protoMessages.response.Response;

  // sequence는 호출 횟수
  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
    sequence: userId ? getNextSequence(userId) : 0,
  };

  // 응답할 메시지를 인코딩
  const buffer = Response.encode(responsePayload).finish();
  // 헤더 만들어주기
  // (1) 전체 길이를 적어주는 공간 할당
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(buffer.length + config.packet.typeLength, 0); // 패킷 길이에 타입 바이트 포함
  // (2) 패킷 타입을 적어주는 공간 할당
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  return Buffer.concat([packetLength, packetType, buffer]);
};