import 'zone.js';
import 'zone.js/testing';
import {ngMocks} from "ng-mocks";

// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
globalThis.ngJest = {
    testEnvironmentOptions: {
        errorOnUnknownElements: true,
        errorOnUnknownProperties: true,
    },
};
import 'jest-preset-angular/setup-jest';

ngMocks.autoSpy('jest');
