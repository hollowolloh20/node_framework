import { SessionProviderContract } from '../server/http/session';

type SessionSettings = {
  idName: string;
  idGenerator: Function;
  provider: SessionProviderContract;
};

export default SessionSettings;
