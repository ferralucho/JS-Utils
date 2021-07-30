import { compareFirmwareVersions } from '../src/statemachine'

const versionCases = [
  ['v0.0.26d', 'v0.0.26d', 0],
  ['v0.0.27d', 'v0.0.26d', 1],
  ['v0.0.2d', 'v0.0.26d', -1],
  ['v0.0.26d', 'v0.0.23d', 1],
  ['v1.0.26d', 'v1.0.26d', 0],
  ['v1.2.26d', 'v1.2.26d', 0],
  ['v2.0.26d', 'v1.0.26d', 1],
  ['v0.1.26d', 'v0.0.23d', 1],
  ['v0.0.27d', 'v0.0.23d', 1],
  ['v1.0.26d', 'v2.0.26d', -1],
  ['v0.1.26d', 'v0.2.23d', -1],
  ['v0.0.27d', 'v0.0.28d', -1],
  ['v0.0.2d', 'v0.0.3d', -1],
  ['v3.1.2d', 'v0.0.3d', 1],
  ['v1.0.2', 'v0.0.3', 1],
]

test.each(versionCases)(
  'compareFirmwareVersions(%s) should be %s',
  (latestVersion: string, deviceVersion: string, expectedResult: number) => {
    expect(compareFirmwareVersions(latestVersion, deviceVersion)).toEqual(expectedResult)
  },
)
