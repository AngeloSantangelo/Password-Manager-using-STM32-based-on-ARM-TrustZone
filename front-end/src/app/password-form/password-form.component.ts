import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

declare global {
  interface Navigator {
    serial: any;
  }
interface SerialPort {
    open: (options: any) => Promise<void>;
    writable: WritableStream;
  }
}

@Component({
  selector: 'app-password-form',
  imports: [FormsModule],
  templateUrl: './password-form.component.html',
  styleUrl: './password-form.component.css',
  standalone: true
})


export class PasswordFormComponent {
  onSubmit() {
    // Inviare la password alla parte sicura della scheda STM32
    console.log('Password salvata');
  }

  password: string = '';
  port: SerialPort | null = null;
  writer: WritableStreamDefaultWriter<any> | null = null;

  // Metodo per connettere il browser alla porta seriale
  async connectSerial() {
    try {
      this.port = await navigator.serial.requestPort();
      if (!this.port) {
        console.error('Errore: Nessuna porta selezionata.');
        return;
      }
  
      await this.port.open({ baudRate: 115200 });
  
      const textEncoder = new TextEncoderStream();
      this.writer = textEncoder.writable.getWriter();
  
      if (!this.port.writable) {
        console.error('Errore: Porta seriale non scrivibile.');
        return;
      }
  
      textEncoder.readable.pipeTo(this.port.writable);
  
      console.log('Connessione Serial Aperta!');
    } catch (err) {
      console.error('Errore durante la connessione seriale:', err);
    }
  }
  

  // Metodo per inviare la password
  async sendPassword() {
    if (!this.writer) {
      console.error('Connessione seriale non aperta!');
      return;
    }

    const data = this.password + '\n'; // Aggiungiamo un newline per STM32
    await this.writer.write(data);
    console.log('Password inviata:', this.password);
  }

}






