import { compareFirmwareVersions } from '../src/statemachine'

const versionCases = [
  ['v0.0.99d', 'v0.0.99d', 0],
  ['v3.1.2d', 'v0.0.3d', 1],
  ['v1.0.2', 'v0.0.3', 1],
]

test.each(versionCases)(
  'compareFirmwareVersions(%s) should be %s',
  (latestVersion: string, deviceVersion: string, expectedResult: number) => {
    expect(compareFirmwareVersions(latestVersion, deviceVersion)).toEqual(expectedResult)
  },
)
