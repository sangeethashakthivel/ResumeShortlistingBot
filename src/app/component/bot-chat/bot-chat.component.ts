import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {BotService} from '../services/bot.service';

@Component({
  selector: 'app-bot-chat',
  templateUrl: './bot-chat.component.html',
  styleUrls: ['./bot-chat.component.scss']
})
export class BotChatComponent implements AfterViewInit {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  messages: { sender: string, text: string }[] = [];
  userMessage = '';

  constructor(private botService: BotService) {
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;

    // Show user's message in chat
    this.messages.push({sender: 'You', text: this.userMessage});

    const msg = this.userMessage;
    this.userMessage = '';

    this.botService.chat(msg).subscribe({
      next: (res: string) => {
        // Add bot response or fallback if empty
        const botReply = res?.trim() ? res : 'Sorry, I didn\'t understand that. 🤔';
        this.messages.push({sender: 'Bot', text: botReply});
        this.scrollToBottom();

      },
      error: (err) => {
        console.error('Bot service error:', err);
        this.messages.push({sender: 'Bot', text: 'Oops! Something went wrong. Please try again.'});
      }
    });
  }

}
