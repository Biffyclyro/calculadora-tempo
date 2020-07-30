import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  resposta = '';
  operador: string;
  primeirasUnidades: string[] = [];
  segundasUnidades: string[] = [];
  tempo: Date = new Date(0);

  constructor() { }

  ngOnInit(): void {
  }

  onKey(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter': {
        this.calcular();
        break;
      }
      case '+': case '-': case '/': case '*': {
        this.insereOperador(event.key, true);
      }

    }
    console.log(event.key);
  }

  insereNumero(valor: number): void {

    this.resposta += String(valor);
  }

  insereUnidade(unidade: string): void {
    if (this.resposta !== '' && !this.endsWithAny(this.resposta,
                      '+', '-', '*', '/', 'h', 'm', 's')){

      this.addUnidades(unidade, this.operador ? this.primeirasUnidades
                                                          : this.segundasUnidades);

    }
  }

  insereOperador(operador: string, keyBoard: boolean = false): void {
    if (this.operador) { this.calcular(); }
    if (this.resposta !== '') { this.operador = operador; }
    if (!keyBoard) { this.resposta += operador; }
  }

  limpar(): void {
    this.operador = undefined;
    this.resposta = '';
    this.primeirasUnidades = [];
    this.segundasUnidades = [];
  }

  calcular(): void {

    let offset = 0;
    const sinal: boolean = (this.resposta[0] === '-') ;
    const operandos: string[] = this.resposta.split(/[-+/*]/);
    const calculo: number[] = this.resposta.split(/[-+/*]/).map(Number);
    const calculoTempo: Date[] = [];

    if (sinal) {
      calculo[1] -= calculo[1] * 2;
      offset++;
    }

    for (let i = 0; i <= 1; i++){
      const numeros: number[] = operandos[i + offset].split(/[hms]/).map(Number);

      calculoTempo.push(this.buildOperandos(i === 0 ? this.primeirasUnidades
                                                             : this.segundasUnidades, numeros));

    }

    if (sinal) {
      calculoTempo[0].setDate(calculoTempo[0].getDate() - calculoTempo[0].getDate() * 2);
    }



   /* const primeiroTempo: number[] = operandos[offset].split(/[hms]/).map(Number);

    this.tempo.setHours(this.tempo.getHours() + primeiroTempo[0]);
    this.tempo.setMinutes(this.tempo.getMinutes() + primeiroTempo[1]);
    this.tempo.setSeconds(this.tempo.getSeconds() + primeiroTempo[2]);*/

   // let calculo: Date[] = [`${this.tempo.getHours()}h${this.tempo.getMinutes()}m`]


    // calculo.forEach(op => console.log(op));


    console.log(calculoTempo[0].getUTCHours());
    switch (this.operador) {
      case '+': {
        this.resposta = String( calculo[offset] + calculo[offset + 1] );
        this.operador = undefined;
        break;
      }
      case '-': {
        this.resposta = String( calculo[offset] - calculo[offset + 1 ] );
        this.operador = undefined;
        break;
      }case '*': {
        this.resposta = String( calculo[offset] * calculo[1 + offset]);
        this.operador = undefined;
        break;
      }case '/': {
        this.resposta = String(calculo[offset] / calculo[offset + 1]);
        this.operador = undefined;
        break;
      }

    }
  }

  private endsWithAny(str: string, ...operadores: string[]): boolean {
     return operadores.some(op => str.endsWith(op));
  }

  private addUnidades(unidade: string, listaUnidades: string[] ): void {

    if (unidade === 'h' && listaUnidades.length === 0) {
      listaUnidades.push(unidade);
      this.resposta += unidade;
    } else if (unidade === 'm' && !listaUnidades.includes('s') && !listaUnidades.includes('m')){
      listaUnidades.push(unidade);
      this.resposta += unidade;
    } else if (unidade === 's' && !listaUnidades.includes('s')) {
      listaUnidades.push(unidade);
      this.resposta += unidade;
    }
  }

  private buildOperandos(unidades: string[], numeros: number[]): Date {
    const tempo = new Date(0);

    if (unidades.length === 3) {
      console.log('3 unidades');
      tempo.setHours(numeros[0]);
      tempo.setMinutes(tempo.getMinutes() + numeros[1]);
      tempo.setSeconds(tempo.getSeconds() + numeros[2]);
    } else if (unidades.includes('h')) {
      console.log('h unidades' , numeros[0]);
      tempo.setHours(numeros.shift());
    } else if (unidades.includes('s')) {
      console.log('s unidades');
      tempo.setSeconds(numeros.pop());
    } else if (unidades.includes('m')) {
      console.log('m unidades');
      tempo.setMinutes(numeros[unidades.indexOf('m')]);
    }

    return tempo;
  }
}
