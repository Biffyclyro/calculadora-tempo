import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {
  resposta = '';
  operador: string;

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

  insereOperador(operador: string, keyBoard: boolean = false): void {
    if (this.operador) { this.calcular(); }
    if (this.resposta !== '') { this.operador = operador; }
    if (!keyBoard) { this.resposta += operador; }
  }

  limpar(): void {
    this.resposta = '';
  }

  calcular(): void {

    let offset = 0;
    const sinal: boolean = (this.resposta[0] === '-') ;
    const calculo: number[] = this.resposta.split(/[-+/*]/)
      .map(Number);

    if (sinal) {
      calculo[1] -= calculo[1] * 2;
      offset++;
    }


    // calculo.forEach(op => console.log(op));

    console.log(calculo[0]);
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
}
