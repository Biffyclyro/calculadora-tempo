import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  resposta = '';
  private isResultado = false;
  operador: string;
  primeirasUnidades: string[] = [];
  segundasUnidades: string[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  onKey(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter': {
        this.calcular();
        break;
      }
      case 'Backspace': {
        this.limpar();
        break;
      }
      case '+': case '-': case '/': case '*': {
        this.insereOperador(event.key, true);
        break;
      }
      case 'h': case 'm': case 's': {
        this.insereUnidade(event.key);
        break;
      }
      default: {
        const keyPressed = Number(event.key);
        if (keyPressed.toString() !== 'NaN') {

          this.insereNumero(keyPressed);
        }
        break;
      }
    }
    // console.log(event.key);
  }

  insereNumero(valor: number): void {
    if (this.isResultado) {
      this.limpar();
      this.isResultado = false;
    }
    this.resposta += String(valor);
  }

  insereUnidade(unidade: string): void {
    if (this.resposta !== ''
      && !this.endsWithAny(this.resposta, '+', '-', '*', '/', 'h', 'm', 's')
      && this.operador !== '*'
      && this.operador !== '/'){
      this.addUnidades(unidade, !this.operador ? this.primeirasUnidades
                                                          : this.segundasUnidades);

    }
  }

  insereOperador(operador: string, keyBoard: boolean = false): void {
    if (this.endsWithAny(this.resposta, 'h', 'm', 's')) {

      if (this.isResultado) { this.isResultado = false; }
      if (this.operador) { this.calcular(); }
      if (this.resposta !== '') { this.operador = operador; }
      this.resposta += operador;
    }
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
    // const calculo: number[] = this.resposta.split(/[-+/*]/).map(Number);
    const calculoTempo: Time[] = [];
    let timeResposta = this.timeZeroBuilder();

    if (sinal) {
      // calculo[1] -= calculo[1] * 2;
      offset++;
    }

    for (let i = 0; i <= 1; i++){
      const numeros: number[] = operandos[i + offset].split(/[hms]/).map(Number);

      calculoTempo.push(this.buildOperandos(i === 0 ? this.primeirasUnidades
                                                             : this.segundasUnidades, numeros));

    }
    
   /* if (sinal) {
      calculoTempo[0].setDate(calculoTempo[0].getDate() - calculoTempo[0].getDate() * 2);
    }*/


    switch (this.operador) {
      case '+': {
        const secondsA = this.parseForSeconds(calculoTempo[0]);
        const secondsB = this.parseForSeconds(calculoTempo[1]);
        timeResposta = this.parseForTime(secondsA + secondsB);
        this.operador = undefined;
        break;
      }
      case '-': {
        const secondsA = this.parseForSeconds(calculoTempo[0]);
        const secondsB = this.parseForSeconds(calculoTempo[1]);
        timeResposta = this.parseForTime(secondsA - secondsB);
        this.operador = undefined;
        break;
      }case '*': {
        const x = Number(operandos[offset + 1]);

        let seconds = this.parseForSeconds(calculoTempo[0]);
        seconds *= x;

        timeResposta = this.parseForTime(seconds);

        this.operador = undefined;
        break;
      }case '/': {
        const x = Number(operandos[offset + 1]);

        let seconds = this.parseForSeconds(calculoTempo[0]);
        seconds /= x;

        timeResposta = this.parseForTime(seconds);
        this.operador = undefined;
        break;
      }

    }
   
    this.isResultado = true;
    this.resposta = this.buldResposta(timeResposta); 
    this.primeirasUnidades = ['h','m','s'];
    this.segundasUnidades = [];
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

  private buildOperandos(unidades: string[], numeros: number[]): Time{
    const tempo: Time = this.timeZeroBuilder();

    if (unidades.length === 3) {
      tempo.h = numeros[0];
      tempo.m = numeros[1];
      tempo.s = numeros[2];
    } else {
      if (unidades.includes('h')) {
        tempo.h = numeros[unidades.indexOf('h')];
      }
      if (unidades.includes('s')) {
        tempo.s = numeros[unidades.indexOf('s')];
      }
      if (unidades.includes('m')) {
        tempo.m = numeros[unidades.indexOf('m')];
      }
    }
    return tempo;
  }

  private buldResposta(timeResposta: Time): string {
    return `${timeResposta.h}h${timeResposta.m}m${timeResposta.s}s`;
  }

  private timeZeroBuilder(): Time{
    return {h: 0, m: 0, s: 0};
  }

  private parseForSeconds(t: Time): number {
    let segundos = t.s;
    segundos += t.m * 60;
    segundos += t.h * 3600;

    return segundos;
  }

  private parseForTime(n: number): Time{
    const h = Math.floor(n / 3600);
    n %= 3600;
    const m = Math.floor(n / 60);
    const s = n % 60;

    return {h, m, s};
  }
}

interface Time {
  h: number;
  m: number;
  s: number;
}
