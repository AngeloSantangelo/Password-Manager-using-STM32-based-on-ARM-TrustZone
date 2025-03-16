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
  }

  password: string = '';
  port: SerialPort | null = null;
  writer: WritableStreamDefaultWriter<any> | null = null;




  async connectSerial() {
    try {
      // Se la porta è già connessa, chiudila prima di riaprire
      if (this.port) {
        console.warn('La connessione seriale è già aperta!');
        return;
      }
  
      // Richiedi la selezione della porta seriale
      this.port = await navigator.serial.requestPort();
  
      if (!this.port) {
        console.error('Errore: Nessuna porta selezionata.');
        return;
      }
  
      // Apri la porta seriale con il baud rate corretto
      await this.port.open({ baudRate: 115200 });
  
      // Ottieni il writer direttamente dalla porta
      this.writer = this.port.writable.getWriter();
  
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
  
    try {
      // Codifica la password in formato Uint8Array
      const encoder = new TextEncoder();
      const data = encoder.encode(this.password + '\n'); // Aggiungi un newline per STM32
  
      // Invia la password via seriale
      await this.writer.write(data);
      console.log('Password inviata:', data);
    } catch (err) {
      console.error('Errore durante l’invio della password:', err);
    }
  }
  
  

}






