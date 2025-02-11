import { Component } from '@angular/core'
import { from, fromEvent, interval } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  intervalMessage = ''
  promiseMessage = ''
  promiseCompleteMessage = ''
  eventMessage = 0

  subscribeToInterval() {
    interval(1000).subscribe({ next: n =>
      this.intervalMessage = `It's been ${n + 1} seconds since subscribing!`
    })
  }

  subscribeToPromise() {
    this.promiseMessage = 'Waiting on the message'
    this.promiseCompleteMessage = ''
    const promise1 = new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve('foo')
      }, 2000)
    )

    from(promise1)
      .subscribe({
        next: message => (this.promiseMessage = `The delayed message is "${message}"`),
        error: error => (this.promiseMessage = 'There\'s been an error'),
        complete: () => (this.promiseCompleteMessage = 'Completed')
      })
  }

  subscribeToEvent() {
    fromEvent(document, 'click')
      .subscribe({ next: _ => (this.eventMessage += 1) })
  }
}
