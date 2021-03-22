declare abstract class LFSR {
    private estado;
    constructor(estado: number[]);
    getEstado(): number[];
    getPos0(): number;
    abstract XORAndPOP(): number;
}
declare class G1 extends LFSR {
    constructor(Estado: number[]);
    XORAndPOP(): number;
}
declare class G2 extends LFSR {
    private satelliteId;
    private readonly prn;
    constructor(estado: number[], satelliteId: number);
    getSatellitedId(): number;
    getPrn(): number[][];
    XORAndPOP(): number;
}
declare abstract class CA {
    constructor();
    generator(g1: G1, g2: G2, sequenceLength: number): number[];
}
declare const testArray1: number[];
declare const testArray2: number[];
declare const g1: G1;
declare const g2: G2;
declare const caCode: number[];
