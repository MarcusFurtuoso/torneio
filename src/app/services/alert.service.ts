import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) {}

  public showSuccessAlert(message: string) {
    this.alert('success', message)
  }

  public showInfoAlert(message: string) {
    this.alert('info', message)
  }

  public showWarnAlert(message: string) {
    this.alert('warn', message)
  }

  public showErrorAlert(message: string) {
    this.alert('error', message)
  }

  private alert(type: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: this.upperFirstLetter(type),
      detail: message,
      life: 2000
    })
  }

  private upperFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
