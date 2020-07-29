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

    if (sinal) {
      calculo[1] -= calculo[1] * 2;
      offset++;
    }

    for (let i = offset; i < 2; i++){
      const numero: number[] = operandos[i].split(/[hms]/).map(Number);

      if () {

      }
    }



   /* const primeiroTempo: number[] = operandos[offset].split(/[hms]/).map(Number);

    this.tempo.setHours(this.tempo.getHours() + primeiroTempo[0]);
    this.tempo.setMinutes(this.tempo.getMinutes() + primeiroTempo[1]);
    this.tempo.setSeconds(this.tempo.getSeconds() + primeiroTempo[2]);*/

   // let calculo: Date[] = [`${this.tempo.getHours()}h${this.tempo.getMinutes()}m`]


    // calculo.forEach(op => console.log(op));

    this.tempo.setMinutes( this.tempo.getMinutes() + 27);
    this.tempo.setTime(this.tempo.getTime() * 2);
    console.log(this.tempo.getMinutes());
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
      console.log('ta entrando quando n deve', listaUnidades.length);
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
}
