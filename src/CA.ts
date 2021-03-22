abstract class LFSR {
  constructor(private estado: number[]) {
  }

  getEstado() {
    return this.estado;
  }

  getPos0() {
    return this.estado[0];
  }

  abstract XORAndPOP(): number;
}

class G1 extends LFSR {
  constructor(Estado: number[]) {
    super(Estado);
  }

  XORAndPOP(): number {
    this.getEstado().unshift((this.getEstado()[9] ^
      this.getEstado()[2]));
    const shiftedNumber = this.getEstado().pop();
    if (typeof shiftedNumber === "number") {
      return shiftedNumber;
    } else {
      return -1;
    }

  }
}

class G2 extends LFSR {
  private readonly prn: number[][] = [[2, 6], [3, 7], [4, 8], [5, 9], [1, 9], [2, 10], [1, 8], [2, 9],
  [3, 10], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8], 
  [6, 9], [1, 3], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [1, 6], [2, 7], [3, 8], [4, 9]];

  constructor(estado: number[], private satelliteId: number) {
    super(estado);
  }

  getSatellitedId(): number {
    return this.satelliteId;
  }

  getPrn() {
    return this.prn;
  }

  XORAndPOP(): number {
    if (this.getSatellitedId() > this.getPrn().length) {
      throw new Error("Satellite id invalid");
    }
    this.getEstado().unshift(this.getEstado()[9] ^
      this.getEstado()[8] ^ this.getEstado()[7] ^ this.getEstado()[5] ^
      this.getEstado()[2] ^ this.getEstado()[1]);

    this.getEstado().pop();

    return this.getEstado()[this.getPrn()[this.getSatellitedId() - 1][0]] ^
      this.getEstado()[this.getPrn()[this.getSatellitedId() - 1][1]]
  }
}

abstract class CA {
  constructor() { };

  generator(g1: G1, g2: G2, sequenceLength: number): number[] {
    const caSequence: number[] = [];
    if (g1.getEstado().length === g2.getEstado().length) {
      for (let index = 0; index < sequenceLength; index++) {
        console.log(`G1: ${g1.getEstado().toString()}`);
        let G1Returns = g1.XORAndPOP();
        let inicial1: number = g1.getPos0();
        console.log(`Realimentacion: ${inicial1}\n`);
        console.log(`G2: ${g2.getEstado().toString()}`);
        let G2Returns = g2.XORAndPOP()
        let inicial2: number = g2.getPos0();
        console.log(`Realimentacion: ${inicial2}\n`);
        caSequence.push(G1Returns ^ G2Returns);
        console.log(`Secuencia: ${caSequence}`);
      }
    }
    return caSequence;
  }
}

const testArray1 = Array<number>(10).fill(0b1);
const testArray2 = Array<number>(10).fill(0b1);
const g1: G1 = new G1(testArray1);
const g2: G2 = new G2(testArray2, 1);
const caCode = CA.prototype.generator(g1, g2, 14);