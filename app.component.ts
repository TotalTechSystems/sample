import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  instructions: Array<number> = [1, 2, 4, 1, 5];
  finalPoint: Array<number> = [];
  history: Array<number> = [0, 0];
  currentLocation: Array<number> = [];
  robotHistory: Array<Array<number>> = [];
 
  finalLocation = this.robotWalk(this.instructions);

  robotWalk(instructions: Array<number>): Array<number> {

    let x = 0;
    let y = 0;
    let turn = 0;
    let north: boolean = true;
    let east: boolean = true;
    let duplicate: boolean = false;

    for (let pos in instructions) {

  
      if (turn % 2 == 0) {
        if (north) {

          for (let i = 0; i < instructions[pos]; i++) {

            this.currentLocation.push(x);
            this.currentLocation.push(y + (i + 1));

              //CHECK IF ALREADY CROSSED
              duplicate = this.checkHistory(this.robotHistory, this.currentLocation);
              if(duplicate) {
                this.finalPoint.push(this.currentLocation[0], this.currentLocation[1]);
                return this.finalPoint;
              }

            this.robotHistory.push(this.currentLocation);
            this.currentLocation = [];
          }

          y += instructions[pos];
          north = false;

        } else { // go south
          console.log(y);

          for (let i = 0; i < instructions[pos]; i++) {

            this.currentLocation.push(x);
            this.currentLocation.push(y - (i + 1));

                       //CHECK IF ALREADY CROSSED
                       duplicate = this.checkHistory(this.robotHistory, this.currentLocation);
                       if(duplicate) {
                         this.finalPoint.push(this.currentLocation[0], this.currentLocation[1]);
                         return this.finalPoint;
                       }


            this.robotHistory.push(this.currentLocation);
            this.currentLocation = [];
          }

          y -= instructions[pos];
          north = true;

        }

      }
      else {
        if (east) {

          for (let i = 0; i < instructions[pos]; i++) {
            this.currentLocation.push(x + (i + 1));
            this.currentLocation.push(y);

                       //CHECK IF ALREADY CROSSED
                       duplicate = this.checkHistory(this.robotHistory, this.currentLocation);
                       if(duplicate) {
                         this.finalPoint.push(this.currentLocation[0], this.currentLocation[1]);
                         return this.finalPoint;
                       }


            this.robotHistory.push(this.currentLocation);
            this.currentLocation = [];
          }

          x += instructions[pos];
          east = false;

        } else { // GO WEST

          for (let i = 0; i < instructions[pos]; i++) {
            this.currentLocation.push(x - (i + 1));
            this.currentLocation.push(y);

                       //CHECK IF ALREADY CROSSED
                       duplicate = this.checkHistory(this.robotHistory, this.currentLocation);
                       if(duplicate) {
                         this.finalPoint.push(this.currentLocation[0], this.currentLocation[1]);
                         return this.finalPoint;
                       }

            this.robotHistory.push(this.currentLocation);
            this.currentLocation = [];
          }

          x -= instructions[pos];
          east = true;

        }

      }

      // TURN AFTER EACH INSTRUCTION
      turn++;

    }

    this.finalPoint.push(x, y);

    // RETURN FINAL LOCATION NO DUPLICATES FOUND
    return this.finalPoint;

  }

  checkHistory(robotHistory: any, currentRobotLocation:any):boolean{
    for (let j = 0; j < robotHistory.length; j++) {
      if ((robotHistory[j][0] == currentRobotLocation[0]) && (robotHistory[j][1] == currentRobotLocation[1])) {
        return true;
      }
    }
    return false;
  }

}
