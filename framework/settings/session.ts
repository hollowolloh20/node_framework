import { SessionProviderContract } from '../server/http/session/session';

type SessionSettings = {
  idName: string;
  idGenerator: Function;
  expire?: number;
  httpOnly?: boolean;
  provider: SessionProviderContract;
};

export default SessionSettings;
