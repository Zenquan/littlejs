interface arrayInterface<T> {
  contains(arr: T[], val: T): boolean;
  //   sort(arr: T[], type: number): T[];
}

class ArrayFn<T> implements arrayInterface<T> {
  contains(arr: T[], val: T): boolean {
    return arr.indexOf(val) !== -1 ? true : false;
  }
  //   sort(arr: T[], type: number = 1): T[] {
  //     return arr.sort((a: T, b: T) => {
  //       switch (type) {
  //         case 1:
  //           return a - b;
  //         case 2:
  //           return b - a;
  //         case 3:
  //           return Math.random() - 0.5;
  //         default:
  //           return arr;
  //       }
  //     });
  //   }
}