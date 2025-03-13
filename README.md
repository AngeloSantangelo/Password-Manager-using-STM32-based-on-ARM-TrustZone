# in progress...
<p align="center">
  <img src="https://github.com/user-attachments/assets/e25d99f7-0aa1-4ead-89ae-97906e69d43e" alt="Logo SAFEPASS">
</p>

## Obiettivo e Descrizione
**SafePassSTM** è un Password Manager Sicuro che usa una scheda STM32 basata su ARM TrustZone con la funzione di server USB. La scheda riceve le password dagli utenti tramite un'interfaccia web e le memorizza nella memoria sicura (Secure Word).

## Descrizione delle Cartelle
- La cartella "front-end" contiene tutti i file riguardanti Typescript e l'interfaccia grafica con Angular, compresa la connessione con la scheda STM32 per l'invio delle password.
- La cartella "iot-security" contiene il progetto sviluppato in STM32CubeIDE. 

## Requisiti
- Hardware: [Scheda STM32 Nucleo-64](https://www.st.com/en/evaluation-tools/NUCLEO-WBA55CG.html)
- IDE: [STM32CubeIDE](https://www.st.com/en/development-tools/stm32cubeide.html) (Last Version) e [STM32CubeMX](https://www.st.com/en/development-tools/stm32cubemx.html) (to generate code) 
- Framework Web: [ANGULAR](https://angular.dev/installation)
- Backend: [TypeScript](https://www.npmjs.com/package/typescript)

## Configurazione di STM32
1. Aprire **STM32CubeIDE**.
2. Aprire **STM32CubeMX** e caricare la configurazione **iot_security.ioc** nella cartella "iot-security".
3. Cliccare **GENERATE CODE**.
4. Cliccare **Open Project** e andare su STM32CubeIDE.
5. Incollare il codice presente nella cartella "iot-security".
6. Collegare la Scheda al PC via USB (cavo USB-TypeC).
7. Clonare la cartella "front-end", utilizzando un qualsiasi IDE (i.e. [Visual Studio Code](https://code.visualstudio.com/download)).
8. Avviare il server da Command-Line (maggiori dettagli nel Readme della cartella "front-end")
   ```
    ng serve
    ```
9. Vai su [http://localhost:4200/](http://localhost:4200/)
