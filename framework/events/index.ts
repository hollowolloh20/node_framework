import { EventEmitter as Emitter } from 'events';
import { useController, ControllerSettings } from '../controller';
import { ControllerExtension } from '../interfaces';

export interface EventEmitterContract {
  emitter: Emitter;
  on(event: string | symbol, handler: Function): ControllerExtension;
  emit(event: string | symbol, data?: any): boolean;
}

class EventEmitter implements EventEmitterContract {
  protected _emitter: Emitter;
  protected _controllersSettings: object;

  public constructor() {
    this._emitter = new Emitter();
    this._controllersSettings = {};
  }

  public get emitter(): Emitter {
    return this._emitter;
  }

  public on(event: string | symbol, handler: Function): ControllerExtension {
    const controllerSettings = new ControllerSettings();

    controllerSettings.setHandler(handler);

    this._controllersSettings[event] = controllerSettings;
    this._emitter.on(event, useController);

    return controllerSettings;
  }

  public emit(event: string | symbol, data?: any): boolean {
    const controllerSettings: ControllerSettings = this._controllersSettings[event];

    if (controllerSettings) {
      if (data) {
        controllerSettings.setData(data);
      }

      return this._emitter.emit(event, controllerSettings.toObject());
    }

    return false;
  }
}

export default EventEmitter;
