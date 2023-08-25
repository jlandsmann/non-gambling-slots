import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import createSpyObj = jasmine.createSpyObj;
import {DEFAULT_CONFIG, SlotMachineConfig} from "../models";

describe('ConfigService', () => {
  let service: ConfigService;
  const mockConfig: SlotMachineConfig = {
    name: 'ABC', availableItems: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getConfig()', () => {
    it('should query localStorage', () => {
      const spy = spyOn(localStorage, 'getItem');
      service.getConfig();
      expect(spy).toHaveBeenCalled();
    });

    it('should return DEFAULT_CONFIG if no config saved', () => {
      const spy = spyOn(localStorage, 'getItem');
      spy.and.returnValue(null);

      const actual = service.getConfig();

      expect(actual).toEqual(DEFAULT_CONFIG);
    });

    it('should return saved config if given', () => {
      const spy = spyOn(localStorage, 'getItem');
      spy.and.returnValue(JSON.stringify(mockConfig));

      const actual = service.getConfig();

      expect(actual).toEqual(mockConfig);
    });
  });

  describe('setConfig()', () => {
    it('should call localStorage', () => {
      const spy = spyOn(localStorage, 'setItem');

      service.setConfig(mockConfig);

      expect(spy).toHaveBeenCalled();
    });

    it('should write value if non given', () => {
      localStorage.clear();
      service.setConfig(mockConfig);
      expect(service.getConfig()).toEqual(mockConfig);
    });

    it('should overwrite given value', () => {
      localStorage.clear();
      service.setConfig({ ...mockConfig, name: 'DEF' });
      service.setConfig({ ...mockConfig, name: 'GHI' });
      expect(service.getConfig()).toEqual({ ...mockConfig, name: 'GHI' });
    });
  });

  describe('updateConfig()', () => {
    it('should get current value', () => {
      const getSpy = spyOn(service, 'getConfig');
      service.updateConfig('name', '123');

      expect(getSpy).toHaveBeenCalled();
    });

    it('should get set value', () => {
      const setSpy = spyOn(service, 'setConfig');
      setSpy.and.callThrough();
      service.updateConfig('name', '123');

      expect(setSpy).toHaveBeenCalled();
      expect(service.getConfig().name).toEqual('123');
    });
  });
});
