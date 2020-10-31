import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../../components/dialogs/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, durationInSeconds: number) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: durationInSeconds * 1000,
    });
  }
}
