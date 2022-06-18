 private dateAdd(interval: 'year' | 'day' | 'hour' | 'second' | 'ms', units: number): Date {
    const date = new Date();
    let ret = new Date(date); //don't change original date
    const checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
    switch (interval.toLowerCase()) {
      case 'year': ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
      case 'day': ret.setDate(ret.getDate() + units); break;
      case 'hour': ret.setTime(ret.getTime() + units * 3600000); break;
      case 'second': ret.setTime(ret.getTime() + units * 1000); break;
      case 'ms': ret.setTime(ret.getTime() + units); break;
    }
    return ret;
  }
