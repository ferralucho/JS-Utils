function compareFirmwareVersions (a: string, b: string): Number {
  let aVersion = a.substring(1, a.length);
  let bVersion = b.substring(1, b.length);
  
  //strip the version for letters
  let numVersionA = aVersion.replace(/[a-zA-Z]+/g, '').split('.');
  let numVersionB = bVersion.replace(/[a-zA-Z]+/g, '').split('.');

  for (let i = 0; i < 3; i++) {
      let na = Number(numVersionA[i]);
      let nb = Number(numVersionB[i]);

      if (na > nb) return 1;
      if (nb > na) return -1;
      if (!isNaN(na) && isNaN(nb)) return 1;
      if (isNaN(na) && !isNaN(nb)) return -1;
  }

  //compare letters
  let lettersFromA = aVersion.match(/[a-zA-Z]+/g).toString();
  let lettersFromB = bVersion.match(/[a-zA-Z]+/g).toString();

  if(!lettersFromA && !lettersFromB) {
      return 0;
  }

  if(!lettersFromA){
      return -1;
  }

  if(!lettersFromB){
      return 1;
  }

  return lettersFromA.localeCompare(lettersFromB);
}
