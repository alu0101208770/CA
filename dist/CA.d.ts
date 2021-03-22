/**
 * Clase abstracta que define un LFSR
 */
declare abstract class LFSR {
    private lfsr;
    constructor(lfsr: number[]);
    /**
     * Metodo que retorna el contenido de un LFSR (array de enteros)
     * @returns Un array de enteros
     */
    getLFSR(): number[];
    /**
     * Metodo que retorna el elemento en la poscicion 0 del array
     * @returns Elemento de la posicion 0
     */
    getPos0(): number;
    /**
     * Metodo abstracto que se implementará para cada tipo de LFSR
     */
    abstract XorAndPop(): number;
}
/**
 * Clase que representa al LFSR1
 */
declare class G1 extends LFSR {
    constructor(lfsr: number[]);
    /**
     * Metodo que realiza un XOR entre la posición 10 y 3 de G1 insertando el valor resultante al comienzo del array
     * También realiza un pop del ultimo elemento y lo retorna para utilizarlo en la ultima operación de XOR
     * @returns El elemento que se extrae al hacer el pop()
     */
    XorAndPop(): number;
}
/**
 * Clase que representa al LFSR2
 */
declare class G2 extends LFSR {
    private sateliteID;
    private readonly g2Tabs;
    constructor(lfsr: number[], sateliteID: number);
    /**
     * Metodo que retorna la ID del satelite introducida
     * @returns ID del satelite
     */
    getSatellitedId(): number;
    /**
     * Metodo que retorna el vector de vectores que representa a los Tabs de G2
     * @returns
     */
    getG2Tabs(): number[][];
    /**
     * Metodo que realiza un XOR entre las posiciones (10, 9, 8, 6, 3, 2) de G2 insertando el valor resultante al comienzo del array
     * Realiza un pop del último elemento para evitar que el array supere el tamaño 10
     * Y extrae del vector de Tabs las posiciones sobre las que se aplicara XOR (dependiendo del sateliteID) junto con el elemento_pop de G1
     * @returns El elemento que se extrae al hacer el pop()
     */
    XorAndPop(): number;
}
/**
 * Metodo que imprime los resultados de las operaciones sobre G1 y G2 y retorna la secuencia resultante
 * @param g1 Estado G1
 * @param g2 Estado G2
 * @param sequenceLength Longitud de la secuencia
 * @returns Secuencia resultante de aplicar el algoritmo
 */
declare function CA_Generator(g1: G1, g2: G2, sequenceLength: number): number[];
declare const array1: number[];
declare const array2: number[];
declare const g1: G1;
declare const g2: G2;
