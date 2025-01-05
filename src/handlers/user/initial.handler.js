import { addUser } from '../../session/user.session.js';
import { createResponse } from '../../utils/response/createResponse.js';
import {
  HANDLER_IDS,
  RESPONSE_SUCCESS_CODE,
} from '../../constants/handlerIds.js';

const initialHandler = async ({ socket, userId, payload }) => {
  const { deviceId } = payload;

  addUser(socket, deviceId);

  const initailResponse = createResponse(
    HANDLER_IDS.INITIAL,
    RESPONSE_SUCCESS_CODE,
    { userId: deviceId },
    deviceId,
  );

  // 소켓을 통해 클라이언트에게 응답 메시지 전송
  socket.write(initailResponse);
};

export default initialHandler;
