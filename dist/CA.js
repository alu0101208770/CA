/**
 * Clase abstracta que define un LFSR
 */
class LFSR {
    constructor(lfsr) {
        this.lfsr = lfsr;
    }
    /**
     * Metodo que retorna el contenido de un LFSR (array de enteros)
     * @returns Un array de enteros
     */
    getLFSR() {
        return this.lfsr;
    }
    /**
     * Metodo que retorna el elemento en la poscicion 0 del array
     * @returns Elemento de la posicion 0
     */
    getPos0() {
        return this.lfsr[0];
    }
}
/**
 * Clase que representa al LFSR1
 */
class G1 extends LFSR {
    constructor(lfsr) {
        super(lfsr);
    }
    /**
     * Metodo que realiza un XOR entre la posición 10 y 3 de G1 insertando el valor resultante al comienzo del array
     * También realiza un pop del ultimo elemento y lo retorna para utilizarlo en la ultima operación de XOR
     * @returns El elemento que se extrae al hacer el pop()
     */
    XorAndPop() {
        this.getLFSR().unshift((this.getLFSR()[9] ^ this.getLFSR()[2]));
        let elemento_pop = this.getLFSR().pop();
        if (typeof elemento_pop === "number") {
            return elemento_pop;
        }
        else {
            return -1;
        }
    }
}
/**
 * Clase que representa al LFSR2
 */
class G2 extends LFSR {
    constructor(lfsr, sateliteID) {
        super(lfsr);
        this.sateliteID = sateliteID;
        // Vector de vectores que representa los Tabs de G2, es decir, las posiciones que se utilizan como operandos para 
        // el último XOR (dependen del sateliteID)
        this.g2Tabs = [[2, 6], [3, 7], [4, 8], [5, 9], [1, 9], [2, 10], [1, 8], [2, 9],
            [3, 10], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
            [6, 9], [1, 3], [4, 6], [5, 7], [6, 8], [7, 9], [8, 10], [1, 6], [2, 7], [3, 8], [4, 9]];
    }
    /**
     * Metodo que retorna la ID del satelite introducida
     * @returns ID del satelite
     */
    getSatellitedId() {
        return this.sateliteID;
    }
    /**
     * Metodo que retorna el vector de vectores que representa a los Tabs de G2
     * @returns
     */
    getG2Tabs() {
        return this.g2Tabs;
    }
    /**
     * Metodo que realiza un XOR entre las posiciones (10, 9, 8, 6, 3, 2) de G2 insertando el valor resultante al comienzo del array
     * Realiza un pop del último elemento para evitar que el array supere el tamaño 10
     * Y extrae del vector de Tabs las posiciones sobre las que se aplicara XOR (dependiendo del sateliteID) junto con el elemento_pop de G1
     * @returns El elemento que se extrae al hacer el pop()
     */
    XorAndPop() {
        if (this.getSatellitedId() > this.getG2Tabs().length) {
            throw new Error("El ID del satelite no es valido");
        }
        this.getLFSR().unshift(this.getLFSR()[9] ^ this.getLFSR()[8] ^ this.getLFSR()[7] ^ this.getLFSR()[5] ^ this.getLFSR()[2] ^ this.getLFSR()[1]);
        this.getLFSR().pop();
        return this.getLFSR()[this.getG2Tabs()[this.getSatellitedId() - 1][0]] ^
            this.getLFSR()[this.getG2Tabs()[this.getSatellitedId() - 1][1]];
    }
}
/**
 * Metodo que imprime los resultados de las operaciones sobre G1 y G2 y retorna la secuencia resultante
 * @param g1 Estado G1
 * @param g2 Estado G2
 * @param sequenceLength Longitud de la secuencia
 * @returns Secuencia resultante de aplicar el algoritmo
 */
function CA_Generator(g1, g2, sequenceLength) {
    let secuencia = [];
    if (g1.getLFSR().length === g2.getLFSR().length) {
        for (let i = 0; i < sequenceLength; i++) {
            console.log(`Iteración ${i}`);
            console.log(`G1: ${g1.getLFSR().toString()}`);
            let elemento_pop = g1.XorAndPop();
            let inicial1 = g1.getPos0();
            console.log(`Realimentacion: ${inicial1}\n`);
            console.log(`G2: ${g2.getLFSR().toString()}`);
            let G2_tab = g2.XorAndPop();
            let inicial2 = g2.getPos0();
            console.log(`Realimentacion: ${inicial2}\n`);
            secuencia.push(elemento_pop ^ G2_tab);
            console.log(`Secuencia: ${secuencia}\n`);
        }
    }
    return secuencia;
}
const array1 = Array(10).fill(0b1);
const array2 = Array(10).fill(0b1);
const g1 = new G1(array1);
const g2 = new G2(array2, 1);
CA_Generator(g1, g2, 14);
