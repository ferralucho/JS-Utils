const assert = require("assert");

let mapDb = new Map<string, Set<string>>();

enum CommandType {
  ADD = "ADD",
  KEYS = "KEYS",
  MEMBERS = "MEMBERS",
  REMOVE = "REMOVE",
  ALLMEMBERS = "ALLMEMBERS",
  ALLITEMS = "ALLITEMS",
}

/** Accepts a "command" string and returns an array of output lines. */
function execute(command: string): string[] {
  let arrCommands: string[] = command.split(" ");
  if (arrCommands.length < 1) {
    return ["Command required"];
  }

  let commandType: CommandType = arrCommands[0] as CommandType;

  let key = "";

  let content = "";

  if (arrCommands.length > 1) {
    key = arrCommands[1];
  }

  if (arrCommands.length > 2) {
    content = arrCommands[2];
  }

  const data = callCommand(commandType, key, content);
  console.log(data);
  return [data];
}

function callCommand(commandType: CommandType, command: string, content: string): string {
  switch (commandType) {
    case CommandType.ADD:
      return addContent(command, content);
    case CommandType.KEYS:
      return getKeysMap();
    case CommandType.MEMBERS:
      return getValuesMap(command);
    default:
      return `) Command does not exist: ${command}`;
  }
}

function getKeysMap(): string {
  let result: string = "";
  let count = 1;

  for (let [key] of mapDb) {
    result = result.concat(count + ") " + key);
    count += 1;
  }
  return result;
}

function getValuesMap(key: string): string {
  if (!mapDb.has(key)) {
    return ") ERROR, key does not exist";
  }

  let valSet = mapDb.get(key);

  let result: string = "";

  if (valSet) {
    let count = 1;

    for (let elem of valSet) {
      result = result.concat(count + ") " + elem + "\n");
      count += 1;
    }
  }

  return result;
}

function addContent(key: string, content: string): string {
  if (mapDb.has(key)) {
    let valSet = mapDb.get(key);
    if (valSet && valSet.has(content)) {
      return ") ERROR, key already exists";
    } else {
      valSet!.add(content);
      mapDb.set(key, valSet!);
    }
  } else {
    let valSet = new Set<string>();
    valSet.add(content);
    mapDb.set(key, valSet);
  }

  return "";
}

describe("set", () => {
  it("can add", () => {
    assert.deepEqual(execute("ADD color blue"), [") Added"]);
    assert.deepEqual(execute("ADD color green"), [") Added"]);
    assert.deepEqual(execute("ADD color green"), [") ERROR, key already exists"]);
  });
  beforeEach(() => {});
});

export {};
